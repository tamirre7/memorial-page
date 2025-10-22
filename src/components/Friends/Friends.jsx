import "./Friends.css";

export default function Friends() {
  const friendsMessages = [
    {
      name: "לירון צ'יבוטרו",
      message: "החברים של בלו"
    },
    {
      name: "סהר שרון", 
      message: "נחזור לעבוד בסלינה"
    },
    {
      name: "תמיר ראובן",
      message: "בודק אם זה נראה טוב"
    }
  ];

  return (
    <section className="friends-section" dir="rtl">
      <div className="friends-container">
        <h2 className="friends-title">חברים מספרים</h2>
        
        <div className="friends-messages">
          {friendsMessages.map((friend, index) => (
            <div key={index} className="friend-message">
              <div className="friend-text">
                "{friend.message}"
              </div>
              <div className="friend-name">
                — {friend.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
