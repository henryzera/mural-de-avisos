export default {

    posts: [],

    getAll(){
        return this.posts;
    },

    newPost(title, description){
        console.log("post adicionado com sucesso!")
        this.posts.push({id: generateID(), title, description});
    },

    deletePost(id){
        this.posts = this.posts.filter(post => post.id != id);
    }
}

function generateID(){
    return Math.random().toString(36).substr(2, 9);
}