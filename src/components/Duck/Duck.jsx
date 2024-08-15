import './Duck.css';
function Duck({top, left,bottom, right, isTyping }) {

  const duckStyle = {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    //transform: 'translate(-50%, -50%, -50%, -50%)',
    animation: isTyping ? 'float2 3s ease-in-out infinite':'float 3s ease-in-out infinite' 
    //animation: isTyping ? 'float 3s ease-in-out infinite':'float2 3s ease-in-out infinite' 
    
  };
  return (
    <div className="duck" style={duckStyle}>
        <div className="duck-body"></div>
        <div className="duck-wing"></div>
        <div className="duck-head"></div>
        <div className="duck-eye"></div>
        <div className="duck-eye-left"></div>
        {/* <div className="duck-beak"></div> */}
        <div className='pico'></div>
    </div>
  )
}
export default Duck