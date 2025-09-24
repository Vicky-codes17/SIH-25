import React from 'react';

const MascotAnimation = ({ isIdle = true, className = '' }) => {
  return (
    <div className={`mascot-animation ${className}`}>
      <div className="mascot-face">
        <div className="mascot-eyes">
          <div className="eye left-eye">
            <div className="pupil"></div>
          </div>
          <div className="eye right-eye">
            <div className="pupil"></div>
          </div>
        </div>
        <div className="mascot-mouth"></div>
      </div>
      
      <style jsx>{`
        .mascot-animation {
          width: 40px;
          height: 40px;
          position: relative;
          animation: ${isIdle ? 'mascotIdle 3s ease-in-out infinite' : 'none'};
        }
        
        .mascot-face {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4ade80, #22c55e);
          border-radius: 50%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .mascot-eyes {
          display: flex;
          gap: 8px;
          margin-bottom: 4px;
        }
        
        .eye {
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          position: relative;
        }
        
        .pupil {
          width: 3px;
          height: 3px;
          background: #1f2937;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: eyeMovement 4s ease-in-out infinite;
        }
        
        .mascot-mouth {
          width: 8px;
          height: 4px;
          border: 1px solid #1f2937;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        
        @keyframes mascotIdle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        @keyframes eyeMovement {
          0%, 20%, 80%, 100% { transform: translate(-50%, -50%); }
          10% { transform: translate(-40%, -50%); }
          30% { transform: translate(-60%, -50%); }
          50% { transform: translate(-50%, -40%); }
          70% { transform: translate(-50%, -60%); }
        }
      `}</style>
    </div>
  );
};

export default MascotAnimation;