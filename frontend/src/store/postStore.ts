import create from 'zustand';
import { EditedPost } from "../../types";

type State = {
    editedPost: EditedPost,
    updateEditedPost: (payload: EditedPost) => void,
    resetEditedPost: () => void,
}

const useStore = create<State>((set) => ({
    editedPost: { id: '', title: '', desc: '', name: '', status: 'draft' },
    updateEditedPost: (payload) =>
        set({
            editedPost: {
                id: payload.id,
                title: payload.title,
                desc: payload.desc,
                name: payload.name,
                status: payload.status
            },
        }),
    resetEditedPost: () =>
        set({editedPost: {id: '', desc: '', title: '', name: '', status: "draft"}})
}))

export default useStore;
