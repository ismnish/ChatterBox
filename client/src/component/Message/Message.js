import React from 'react'
import './Message.css'
const Message = ({user, message, userClass}) => {
    if(user){
        return(
            <div className={`messageBox ${userClass}`}>
                {`${user}: ${message}`}
            </div>
        )
    }
    else{
        return (

            <div className={`messageBox ${userClass}`}>
              {`You: ${message}`}
            </div>
          )
    }
  
}

export default Message
