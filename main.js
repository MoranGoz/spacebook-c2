
 var posts = [
  // {text: "Hello world", id: 0, comments:[
  //   { text: "Man, this is a comment!"},
  //   { text: "Man, this is a comment!"},
  //   { text: "Man, this is a comment!"}
  // ]},
  // {text: "Hello world", id: 0, comments:[
  //   { text: "Man, this is a comment!"},
  //   { text: "Man, this is a comment!"},
  //   { text: "Man, this is a comment!"}
  // ]},
  // {text: "Hello world", id: 0, comments:[
  //   { text: "Man, this is a comment!"},
  //   { text: "Man, this is a comment!"},
  //   { text: "Man, this is a comment!"}
  // ]}
];
var SpacebookApp = function () {
  // the current id to assign to a post
  var currentId = 0;
  var Cid =0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }
  var _findcommentById = function (array,Cid) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i].Cid === Cid) {
        return array[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      comments :[]
    };
    currentId += 1;
    posts.push(post);
  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container"><div>' +
      '</div><input type="text" class="comment-name">' +
      '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +  renderComments(posts[i].comments)+
        commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var removeComment = function (btnComment) {
      //looking for the data id of the post that the comment belongs to
      var $clickedPost = $(btnComment).closest('.post');
      var id = $clickedPost.data().id;
      var post = _findPostById(id); 
      //looking for the data id of the comment
      var $clickedcomment = $(btnComment).closest('.comment');
      var Cid = $clickedcomment.data().id;
      var comment = _findcommentById(post.comments,Cid);
      var indexOfComment=post.comments.indexOf(comment)
      post.comments.splice(indexOfComment,1);
      app.renderPosts();
    }
   
  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var createComment = function (cText,addToPostInIndex) {
    var newComment = {
      text: cText,
      Cid: Cid
    }
    Cid += 1;
    addToPostInIndex.comments.push(newComment);
  }

  var renderComments = function (comments) {
    let commentsString="";
    //for (comment in comments) {
      for (var i = 0; i < comments.length; i += 1) {
      commentsString +='<p class="comment" data-id='+ comments[i].Cid + '>' + comments[i].text + '<br><a href="#" class="remove-comments">remove</a></p> ';
    }
       return commentsString
  }
 


$('.posts').on('click','.add-comment', function () {
  var cText=$(this).closest('div').find('.comment-name').val();
  var addto=_findPostById($(this).closest('.post').data().id);
  app.createComment(cText,addto);
  app.renderPosts();
});

  return {
    createPost: createPost,
    renderPosts: renderPosts,
    removePost: removePost,

    // TODO: Implement
     createComment: createComment,

    // TODO: Implement
     renderComments: renderComments,

    // TODO: Implement
    removeComment: removeComment,
    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();
  
  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click','.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click','.remove-comments', function () {
  app.removeComment(this);
});