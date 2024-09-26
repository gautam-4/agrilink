import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import { Context } from "../../Context/GeminiContext";
import sanitizeHtml from 'sanitize-html';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [processing,setProcessing]=useState(false);
  const [hiddenPrompt, setHiddenPrompt] = useState("");
  const [imagePreview, setImagePreview] = useState(null); 
  const handleCardClick = (prompt) => {
    setInput((prev) => prev ? `${prev} ${prompt}` : prompt);
  };
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleCopyClick = () => {
    // Remove HTML tags from the result data
    const sanitizedData = resultData.replace(/<[^>]*>?/gm, "");

    // Copy the sanitized result data to the clipboard
    navigator.clipboard.writeText(sanitizedData);
    // Optionally, you can provide user feedback that the data has been copied
    // For example, you can display a tooltip or a message indicating that the data has been copied.
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
  
      toast.info("Your image is being processed...");
  
      setProcessing(true);
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("http://127.0.0.1:8000/predict_disease", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        const diseasePrediction = data.prediction;
  
        const hiddenPromptMessage = `How do I solve the identified disease: ${diseasePrediction}?`;
        setHiddenPrompt(hiddenPromptMessage);
  
      } catch (error) {
        toast.error("Error while processing the image.");
        console.error("Error:", error);
      } finally {
        setProcessing(false);  // Re-enable actions
      }
    }
  };
  
  const handleSend = () => {
    if (!processing) {
      const combinedPrompt = `${input}. ${hiddenPrompt}`;

      onSent(combinedPrompt);  // Pass combined data to the backend

      setInput("");
      setHiddenPrompt("");
      setImagePreview(null)
    }
  };
  
  
  return (
    <div className="main">
      <ToastContainer />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="upload-input"
      />
      <div className="agribot-main">
        <div className="main-container">
         
          {showResult ? (
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr className="animated-bg" />
                    <hr className="animated-bg" />
                    <hr className="animated-bg" />
                  </div>
                ) : (
                  <>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                      {"\n\n"}
                      {sanitizeHtml(resultData, {
                        allowedTags: [],
                        allowedAttributes: {},
                      })}
                    </pre>

                    <button onClick={handleCopyClick} className="copy-button">
                      <img src={assets.copy} alt="Copy" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="greet">
                <p>
                  <span>Hello,नमस्ते Farmer.</span>
                </p>
                <p>
                  How can I help you today? <br />
                  मैं आपकी क्या मदद कर सकता हूं?
                </p>
              </div>
              <div className="cards">
                <div
                  className="card"
                  onClick={() => document.getElementById("upload-input").click()}
                >
                  <p>
                    Upload the picture of your crop to get output.
                  </p>
                  <img src={assets.uploadIcon} alt="" />
                </div>
                
              </div>
            </>
          )}
          <div className="main-bottom" style={imagePreview?{bottom:"-30px"}:{}}>
          
            <div className="search-box">
            <div className="input-container">
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%", height: "auto",minHeight:"30px",minWidth:"40px",borderRadius:"10px" }} />
              </div>
            )}
            <input
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress} // Add event listener for key press
                value={input}
                type="text"
                placeholder="Enter a prompt here"
                style={{ border: "1px solid black", borderRadius: "10px" ,width:"100%"}}
              />
            </div>
              
              <div className="icons">
              <img src={assets.gallery_icon} width={30} alt="" onClick={() => document.getElementById("upload-input").click()}/>
                <img src={assets.mic_icon} width={30} alt="" />
                {input ? (
                  <img
                    onClick={() => handleSend()}  // Call the send handler
                    src={assets.send_icon}
                    width={30}
                    alt="Send"
                    style={{ opacity: processing ? 0.5 : 1 }} // Reduce opacity when disabled
                  />
                ) : null}
              </div>
            </div>
            <p className="bottom-info">
              AgriBot may display inaccurate info, including about people, so
              double-check its responses. Your privacy and AgriBot Apps
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Main;
