import './RubberDuck.css';

function Lines({top="0", left="0"}) {
    const lineStyle = {
        top: top,
        left: left
    };

  return (
    <div className="water-lines-wrapper" style={lineStyle}>
          <div className="water-lines">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
  )
}
export default Lines