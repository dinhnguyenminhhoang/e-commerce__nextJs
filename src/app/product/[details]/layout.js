import Comment from "@/components/Comment/Comment";

export default function Detaillayout({ children }) {
    return (
        <section>
            {children}
            <Comment />
        </section>
    );
}
