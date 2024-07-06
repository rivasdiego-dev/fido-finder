type ButtonProps = {
  type: 'primary' | 'secondary';
  text: string;
};

const ActionButton = (props: ButtonProps) => {
  const { type, text } = props;

  const styles = {
    primary: 'bg-b-primary-500 text-white shadow-xl',
    secondary: 'bg-[#314154] text-[#357dc2]',
  };

  return (
    <div
      className={`w-full flex justify-center items-center p-2 rounded-md ${styles[type]}`}
    >
      {text}
    </div>
  );
};

export default ActionButton;
