import Button from "../Ui/Button";

const CallToAction = ({
  title = "Default Title",
  para = "Default description.",
  action = "Click Here",
  actionFunc = () => {},
  img = "",
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-b rounded-md border-b-gray-700">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-gray-800">{para}</p>
        <Button onClick={actionFunc} className="mt-4" type="button">
          {action}
        </Button>
      </div>

      {img && (
        <div className="flex-1">
          <img
            src={img}
            alt="Call to action image"
            loading="lazy"
            className=""
          />
        </div>
      )}
    </div>
  );
};

export default CallToAction;
