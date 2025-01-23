import React, { useState } from 'react';
import axios from 'axios';

function FileManager() {
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // GET: ファイル内容を取得
  const fetchFileContent = async () => {
    try {
      const response = await axios.get(`/files/${fileName}`);
      setMessage(`ファイルの内容: \n${response.data}`);
      setError('');
    } catch (err) {
      setError('ファイルの読み込みに失敗しました。');
      setMessage('');
    }
  };

  // POST: 新しいファイルを作成
  const createFile = async () => {
    try {
      const response = await axios.post('/files', null, {
        params: { file_name: fileName },
      });
      setMessage(response.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 409) {
        setError('ファイルは既に存在しています。');
      } else {
        setError('ファイルの作成に失敗しました。');
      }
      setMessage('');
    }
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ファイル管理ツール</h1>

      {/* ファイル名入力 */}
      <div>
        <label htmlFor="fileName">ファイル名: </label>
        <input
          type="text"
          id="fileName"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="ファイル名を入力"
          style={{ margin: '0 10px', padding: '5px' }}
        />
      </div>

      {/* ボタン */}
      <div style={{ marginTop: '10px' }}>
        <button
          onClick={fetchFileContent}
          style={{
            padding: '10px 15px',
            marginRight: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ファイルを取得
        </button>
        <button
          onClick={createFile}
          style={{
            padding: '10px 15px',
            backgroundColor: '#008CBA',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ファイルを作成
        </button>
      </div>

      {/* メッセージ表示 */}
      <div style={{ marginTop: '20px' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && (
          <pre
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
          >
            {message}
          </pre>
        )}
      </div>
    </div>
  );
}

export default FileManager;
