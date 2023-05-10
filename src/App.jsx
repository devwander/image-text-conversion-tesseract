import { useState } from "react"
import Tesseract from "tesseract.js"
import "./App.css"

function App() {
  const [imagePath, setImagePath] = useState("")
  const [text, setText] = useState("")
  const [progress, setProgress] = useState(0)

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]))
  }

  const handleClick = () => {

    if (imagePath != "") {
      Tesseract.recognize(imagePath, "por", {
        logger: (m) => {
          setProgress(m.progress)
        }
      })
        .catch((err) => {
          console.error(err)
        })
        .then((result) => {
          let text = result.data.text
          setText(text)
        })
    }
  }

  return (
    <div>
      <h1 className="title">Convert image to text</h1>

      <div className="section">
        <div className="container">
          <div className="left">
            <p className="subtitle">Upload the image</p>
            <p className="warning">* Accepted formats: png, jpg, jpeg</p>
            <input type="file" onChange={handleChange} />
            <img
              className="image"
              src={imagePath ? imagePath : "../public/noimage.jpg"}
            />
          </div>

          <div className="mid"></div>

          <div className="right">
            <button className="btnConvert" onClick={handleClick}>
              Convert
            </button>

            <progress className="progressBar" value={progress} max={1}></progress>

            <p className="subtitle">Extracted text</p>
            <div className="result-text">
              <textarea value={text} readOnly={true} cols="40" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
