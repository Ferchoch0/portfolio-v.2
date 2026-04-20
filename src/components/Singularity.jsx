import './Singularity.css';

const Singularity = ({ size = 1, className = '', style = {}, ...props }) => {
  const factor = Number(size);
  const safe = Number.isFinite(factor) && factor > 0 ? factor : 1;

  return (
    <div
      className={`loader ${className}`}
      style={{ '--size': String(safe), ...style }}
      {...props}
    >
      <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <mask id="clipping">
            <polygon points="0,0 100,0 100,100 0,100" fill="black" />
            <polygon points="25,25 75,25 50,75" fill="white" />
            <polygon points="50,25 75,75 25,75" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
            <polygon points="35,35 65,35 50,65" fill="white" />
          </mask>
        </defs>
      </svg>
      <div className="box" />
    </div>
  );
};

export default Singularity;
