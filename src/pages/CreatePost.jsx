import React, { useState } from "react";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إنشاء المنشور!");
    // هنا يمكنك إضافة كود إرسال البيانات للخادم أو حفظها
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>إنشاء منشور</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <img
            src={image}
            alt="معاينة"
            style={{ width: "100%", maxWidth: "300px", marginTop: "10px" }}
          />
        )}
        <textarea
          placeholder="اكتب التعليق..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          style={{ width: "100%", marginTop: "10px" }}
        />
        <button type="submit" style={{ marginTop: "10px" }}>نشر</button>
      </form>
    </div>
  );
};

export default CreatePost;