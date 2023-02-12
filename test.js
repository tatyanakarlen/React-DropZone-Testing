import React, {useMemo, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {useDropzone} from 'react-dropzone';




// const thumbsContainer = {
//   display: 'flex',
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   marginTop: 16
// };

// const thumb = {
//   display: 'inline-flex',
//   borderRadius: 2,
//   border: '1px solid #eaeaea',
//   marginBottom: 8,
//   marginRight: 8,
//   width: 100,
//   height: 100,
//   padding: 4,
//   boxSizing: 'border-box'
// };

// const thumbInner = {
//   display: 'flex',
//   minWidth: 0,
//   overflow: 'hidden'
// };

// const img = {
//   display: 'block',
//   width: 'auto',
//   height: '100%'
// };


// function Previews(props) {
//   const [files, setFiles] = useState([]);
//   const {getRootProps, getInputProps} = useDropzone({
//     accept: {
//       'image/*': []
//     },
  //   onDrop: acceptedFiles => {
  //     setFiles(acceptedFiles.map(file => Object.assign(file, {
  //       preview: URL.createObjectURL(file)
  //     })));
  //   }
  // });
  
  // const thumbs = files.map(file => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <img
  //         src={file.preview}
  //         style={img}
  //         // Revoke data uri after image is loaded
  //         onLoad={() => { URL.revokeObjectURL(file.preview) }}
  //       />
  //     </div>
  //   </div>
  // ));

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  // }, []);

//   return (
//     <section className="container">
//       <div {...getRootProps({className: 'dropzone'})}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>
      // <aside style={thumbsContainer}>
      //   {thumbs}
      // </aside>
//     </section>
//   );
// }

// <Previews />



const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  height: 200,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

function StyledDropzone(props) {
//   const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject, 
    acceptedFiles, 
    open
  } = useDropzone({accept: 'image/*', noClick: true, noKeyboard: true,  onDrop: acceptedFiles => {
    setSelectedFile(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const thumbs = selectedFile.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => selectedFile.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const filepath = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <button type="button" onClick={open}>
          Open File Dialog
        </button>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{filepath}</ul>
      </aside>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </div>
  );
}

<StyledDropzone />

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledDropzone  />
  </React.StrictMode>
);