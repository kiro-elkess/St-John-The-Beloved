const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const ROOT = db.collection("james").doc("app");

// Helper to send push message to all registered tokens
async function sendToAllTokens(title, body, url = "./index.html") {
  const snap = await ROOT.collection("fcm_tokens").get();
  if (snap.empty) {
    console.log("No FCM tokens registered.");
    return { success: 0, failure: 0 };
  }

  const tokens = snap.docs.map(doc => doc.id);
  const message = {
    notification: { title, body },
    data: { title, body, url },
    tokens: tokens
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(`Successfully sent ${response.successCount} messages, ${response.failureCount} failed.`);
    
    // Clean up invalid tokens
    const tokensToRemove = [];
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        const errCode = resp.error?.code;
        if (
          errCode === "messaging/invalid-registration-token" ||
          errCode === "messaging/registration-token-not-registered"
        ) {
          tokensToRemove.push(tokens[idx]);
        }
      }
    });

    if (tokensToRemove.length > 0) {
      const batch = db.batch();
      tokensToRemove.forEach(tok => {
        batch.delete(ROOT.collection("fcm_tokens").doc(tok));
      });
      await batch.commit();
      console.log(`Cleaned up ${tokensToRemove.length} obsolete tokens.`);
    }

    return { success: response.successCount, failure: response.failureCount };
  } catch (err) {
    console.error("Error sending push multicast:", err);
    return { error: err.message };
  }
}

// 1. Morning Spiritual Reminder (Every day at 8:00 AM Egypt / UTC+2 or +3)
exports.morningSpiritualReminder = functions.pubsub
  .schedule("0 8 * * *")
  .timeZone("Africa/Cairo")
  .onRun(async context => {
    return sendToAllTokens(
      "🌅 صباح الخير مع المسيح — أسرة يوحنا الحبيب",
      "ابدأ يومك مع ربنا! لا تنسَ صلاة باكر وقراءة إنجيل اليوم في النوتة الروحية 🙏📖"
    );
  });

// 2. Evening Spiritual Reminder (Every day at 9:00 PM Egypt)
exports.eveningSpiritualReminder = functions.pubsub
  .schedule("0 21 * * *")
  .timeZone("Africa/Cairo")
  .onRun(async context => {
    return sendToAllTokens(
      "🌙 سلام المسيح معك — أسرة يوحنا الحبيب",
      "اختم يومك بالصلاة والشكر! تذكير بصلاة النوم وتدقيق النوتة الروحية ✝️✨"
    );
  });

// 3. Birthday Reminder (Every day at 10:00 AM Egypt)
exports.birthdayReminder = functions.pubsub
  .schedule("0 10 * * *")
  .timeZone("Africa/Cairo")
  .onRun(async context => {
    const today = new Date();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayTarget = `-${mm}-${dd}`;

    const snap = await ROOT.collection("students").get();
    const bdayStudents = [];
    snap.docs.forEach(doc => {
      const data = doc.data();
      if (data.birthday && data.birthday.endsWith(todayTarget)) {
        bdayStudents.push(data.name);
      }
    });

    if (bdayStudents.length > 0) {
      const names = bdayStudents.join(" و ");
      return sendToAllTokens(
        "🎉🎂 عيد ميلاد سعيد في أسرة يوحنا الحبيب!",
        `نحتفل اليوم بعيد ميلاد: ${names} 🥳🎈 كل سنة وأنت طيب ومبارك في حضن كنيستنا!`
      );
    }
    return null;
  });

// 4. Manual Push Trigger from Admin panel
exports.sendManualNotification = functions.https.onCall(async (data, context) => {
  const title = data.title || "أسرة القديس يوحنا الحبيب ✝️";
  const body = data.body || "إشعار جديد";
  return sendToAllTokens(title, body, data.url || "./index.html");
});