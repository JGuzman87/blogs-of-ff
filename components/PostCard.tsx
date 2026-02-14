import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  isPending: boolean;
  data: [];
  error: any;
}

const PostCard = ({ isPending, data, error }: Props) => {
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blogpost/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        data.filter((post: { _id: string }) => post._id !== id);
      }
    } catch (error) {
      console.error("failed to delte post", error);
    }
  };

  const mutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  if (error) return "An error has occured" + error.message;
  return (
    <motion.div
      className="card gap-2 col-span-2 p-2"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", ease: "easeInOut", duration: 1 }}
    >
      {isPending ? (
        <p className="font-bold skeleton skeleton-text">Loading...</p>
      ) : (
        <AnimatePresence mode="popLayout">
          {data.map(
            (stored: {
              _id: string;
              title: string | number;
              content: string;
            }) => (
              <motion.div
                key={stored._id}
                className="card-body bg-white/50 backdrop-blur-lg text-black rounded-2xl"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{
                  type: "spring",
                  ease: "easeInOut",
                  duration: 0.5,
                }}
                layout
              >
                <h2 className="font-bold text-2xl border-b-2 border-gray-500/30 ">
                  {stored.title}
                </h2>
                <p>{stored.content}</p>
                <button
                  type="button"
                  className="self-end"
                  onClick={() => mutation.mutate(stored._id)}
                >
                  X
                </button>
              </motion.div>
            ),
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default PostCard;
