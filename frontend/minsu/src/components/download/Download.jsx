import './Download.css'
import axios from 'axios'
// import downloadFile from './DownloadFile'

const Download = () => {

  const downloadFile = () => {

    const api = import.meta.env.VITE_REST_API
  
  
    // 1. 서버로 파일 요청
    axios.get(`${api}/download`, {responseType : 'blob'})
  
    // 2-1. 요청 성공 시 다운로드할 수 있도록 실행
    .then((res) => {
  
      // 2-1. 받은 파일을 게임 다운로드할 수 있도록 실행
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      
      link.href = url
      link.setAttribute('download', 'minsu.zip')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  
    // 2-2. 요청 실패 시 에러 메세지를 띄우고 종료
    .catch((err) => {
      console.log(err)
    })
    
  }

  return (
  <button className="download" onClick={downloadFile}>
    <span className="download_lg">
      <span className="download_sl"></span>
      <span className="download_text">DOWNLOAD NOW</span>
    </span>
  </button>
  )
}

export default Download