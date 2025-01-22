import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileContentViewer() {
  const [fileContent, setFileContent] = useState('');
  const [error, setError] = useState('');

  // APIを呼び出してデータを取得
  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get('/get-file'); // Spring BootのAPIエンドポイント
        setFileContent(response.data); // レスポンスの内容を状態に保存
      } catch (err) {
        setError('ファイルの読み取りに失敗しました。');
      }
    };

    fetchFileContent();
  }, []);

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ファイル内容ビューア</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div style={{ 
          padding: '10px', 
          border: '1px solid #ccc', 
          borderRadius: '5px', 
          backgroundColor: '#f9f9f9' 
        }}>
          <h2>ファイルの内容:</h2>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {fileContent || '読み込み中...'}
          </pre>
        </div>
      )}
    </div>
  );
}

export default FileContentViewer;
