// src/components/Navbar/IconsButton.jsx
const IconsButton = ({ Icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="p-2 rounded-full hover:bg-blue-400 transition"
        >
            <Icon />
        </button>
    );
};

export default IconsButton;
