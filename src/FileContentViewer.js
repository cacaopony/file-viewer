import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileManager() {
  const [fileName, setFileName] = useState('');
  const [fileList, setFileList] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // ファイルリストを取得する関数
  const fetchFileList = async () => {
    try {
      const response = await axios.get('/files/list');
      setFileList(response.data); // ファイルリストを状態に保存
      setError('');
    } catch (err) {
      setError('ファイルリストの取得に失敗しました。');
    }
  };

  // 初回レンダリング時にファイルリストを取得
  useEffect(() => {
    fetchFileList();
  }, []);

  // ファイル内容を取得する関数
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

  // 新しいファイルを作成する関数
  const createFile = async () => {
    try {
      const response = await axios.post('/files', null, {
        params: { file_name: fileName },
      });
      setMessage(response.data);
      setError('');
      setTimeout(fetchFileList, 1000);
       // ファイルリストを更新
    } catch (err) {
      if (err.response?.status === 409) {
        setError('ファイルは既に存在しています。');
      } else {
        setError('ファイルの作成に失敗しました。');
      }
      setMessage('');
    }
  };

  //ファイルを削除する関数
  // const deleteFile 

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ファイル管理ツール</h1>

      {/* ファイルリストの表示 */}
      <div>
        <h2>ファイルリスト:</h2>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {fileList.map((file, index) => (
              <li
                key={index}
                style={{
                  padding: '5px 0',
                  borderBottom: '1px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={() => setFileName(file)} // ファイル名を選択
              >
                {file}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ファイル名の入力 */}
      <div style={{ marginTop: '20px' }}>
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
            marginRight: '10px',
            backgroundColor: '#008CBA',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ファイルを作成
        </button>

        <button
          // onClick={}
          style={{
            padding: '10px 15px',
            backgroundColor: '#008CBA',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ファイルを削除
        </button>
      </div>

      {/* メッセージ表示 */}
      <div style={{ marginTop: '20px' }}>
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
