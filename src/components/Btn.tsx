
const Btn = ({BtnName}: {BtnName: string}) => {
  return (
    <button className="text-lg font-bold bg-gray-mint rounded-md w-full h-[35px] hover:bg-black-blue">
      {BtnName}
    </button>
  );
};

export default Btn;
