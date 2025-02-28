const InputError = ({ messages, className = "" }) => {
  if (!messages) return null; // No error, don't render anything
  const errorMessages = Array.isArray(messages) ? messages : [messages]; // Convert to array if needed

  return (
    <>
      {errorMessages.map((message, index) => (
        <p className={`${className} text-sm text-red-600`} key={index}>
          {message}
        </p>
      ))}
    </>
  );
};

export default InputError;
