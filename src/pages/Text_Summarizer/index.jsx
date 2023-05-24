import { useState, useEffect } from 'react'
import "./style.css"
import { useSpeechSynthesis } from 'react-speech-kit';
import axios from 'axios';
const baseUrl = "http://localhost:3000"

const Text_Summarizer = () => {
const [rawArticle,setRawArticle]= useState('');
const [summarizedArticle,setSummarizedArticle]= useState('');

const { speak, speaking, supported } = useSpeechSynthesis();


//handleSummarizing article
const handleSummarizing = async () => {
  try {
      const response = await axios.post("http://localhost:3000/summarize",{
        article:rawArticle
      });
      console.log("responseData",response?.data)
      setSummarizedArticle(response?.data?.summary);
      
    } catch (error) {
      console.log("error msg",error);
    }
}

//handleSpeak
const handleSpeak = () => {
    speak({ text:summarizedArticle});
  };

//handleCopyToClipboard
const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(summarizedArticle)
      .then(() => {
        alert('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      });
  };

//handleClearAll
const handleClearAll=()=>{
  setRawArticle("");
  setSummarizedArticle("")
}

  return (
    <div id="text-summarizer_container">
       <section className="raw-article_wrapper">
         <h4> Summarize Your Article </h4>
         <textarea 
          className="raw-article-input"
          placeholder="Past your article here for summarize... "
          value={rawArticle}
          onChange={(e)=>setRawArticle(e.target.value)}  
          
         ></textarea>
         <button onClick={handleSummarizing} id="start-summarizing-btn">Summarize </button>
         <button onClick={handleClearAll} className="clearAll">Clear All</button>
       </section>
       
       <section className="summarized-article_wrapper">
         <h4> Summarized Article </h4>
         <div className="util-box">
          { 
         summarizedArticle && (
         <>
          <button onClick={handleSpeak} disabled={ !supported} >
                Audio
            </button>
           <button onClick={handleCopyToClipboard}>
              Copy
           </button>
          </>
            )
          }
         </div>
         <div className="summarized-article">
           {summarizedArticle.length <= 0 ? "No Summary..." : summarizedArticle}
         </div>
       </section>
    </div>
  )
}

export default Text_Summarizer
