import { motion } from "framer-motion";

interface Props {
  isPending: boolean;
  data: [];
  error: any;
}

const PostCard = ({ isPending, data, error }: Props) => {
  if (error) return "An error has occured" + error.message;
  return (
    <motion.div
      className="card gap-2 col-span-2 p-2"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", ease: "easeInOut", duration: 1 }}
    >
      {isPending
        ? "Loading..."
        : data.map(
            (stored: {
              _id: string | number;
              title: string | number;
              content: string;
            }) => (
              <motion.div
                key={stored._id}
                className="card-body bg-white/50 backdrop-blur-lg text-black rounded-2xl"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  ease: "easeInOut",
                  duration: 1,
                }}
              >
                <button type="button" className="self-end btn">X</button>
                <h2 className="font-bold text-2xl border-b-2 border-gray-500/30 ">
                  {stored.title}
                </h2>
                <p>{stored.content}</p>
              </motion.div>
            ),
          )}
    </motion.div>
  );
};

export default PostCard;
