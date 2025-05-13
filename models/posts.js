export default {

    posts: [
        
    ],

    getAll(){
        return this.posts;
    },

    newPost(title, description){
        console.log("post adicionado com sucesso!")
        this.posts.push({id: generateID(), title, description});
    }
}

function generateID(){
    return Math.random().toString(36).substr(2, 9);
}