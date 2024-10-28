import { deleteReview } from "@/app/utilities/data";

export function DeleteReviewButton({ id, onDelete }: { id: string, onDelete: (id:string) => void}) {
    const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 

        const response = await deleteReview(id);
        
        if (response.success) {
            console.log("Review deleted successfully");
            onDelete(id);
        } else {
            console.error("Error deleting review:", response.message);
        }
    };
   
    return (
      <form onSubmit={handleDelete}>
        <button className="bg-main-1 text-main-2 px-4 w-25 h-10 flex justify-center items-center rounded-md shadow-md md:hover:bg-main-2 md:hover:text-secondary-2" type="submit"><img src="/images/delete.png" alt="delete symbol" width={25} height={25} className="m-auto"/></button>
      </form>
    );
  }