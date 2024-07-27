const EmptyState = () => {
  return (
    <div className="h-full flex justify-center items-center px-4 py-10 sm:px-6 lg:px-8 bg-gray-100">
      <div className="text-center flex flex-col items-center">
        <h3 className="text-2xl font-semibold text-gray-900">
          Select a chat or start a new conversation
        </h3>
      </div>
    </div>
  );
}

export default EmptyState;