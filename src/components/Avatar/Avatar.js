import avatarImage from '../img/kgu.png';

const Avatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div className="react-chatbot-kit-chat-bot-avatar-container">
        <img
          className="react-chatbot-kit-chat-bot-avatar-image"
          src={avatarImage}
          alt="Avatar"
        />
      </div>
    </div>
  );
};

export default Avatar;
