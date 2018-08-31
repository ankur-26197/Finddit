 const searchForm=document.getElementById('search-form');
 const searchInput=document.getElementById('search-input');

 searchForm.addEventListener('submit',e=>{
   // get search Term
   const searchTerm=searchInput.value;
   //get sort
   const sortBy=document.querySelector('input[name="sortby"]:checked').value;
   console.log(sortBy);
   //get Limit
   const searchLimit=document.getElementById('limit').value;
   console.log(searchLimit);
      // check searchInput
   if(searchTerm==='')
   {
     showMessage('Please add a search term','alert-danger');
   }

   //clear input
   searchInput.value='';
   //search Finddit
   search(searchTerm,searchLimit,sortBy);
   e.preventDefault();
 });

 // show message
function showMessage(message,className)
{
  // create div
  const div= document.createElement('div');
  //add classes
  div.className=`alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const searchContainer=document.getElementById('search-container');
  // get search
  const search= document.getElementById('search');
  //insert meessage
  searchContainer.insertBefore(div,search);
  //timeout alert
  setTimeout(()=>document.querySelector('.alert').remove(),2000);
}
function search(searchTerm,searchLimit,sortBy)
{
    fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
      .then(res=>res.json())
      .then(data=>data.data.children.map(data=>data.data))
      .then(results=>{
        let output='<div class="card-columns">';
        results.forEach(post=>{
          console.log(results);
          // check for image
          let image=post.preview ? post.preview.images[0].source.url:'reddit.jpg';
          output+=`
          <div class="card">
          <img class="card-img-top" src="${image}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext,100)}</p>
          <a href="${post.url}" class="btn btn-primary" target="_blank">Read More</a>
          <hr>
          <span class="badge badge-secondary">Subreddit : ${post.subreddit}</span>
          <span class="badge badge-dark">Score : ${post.score}</span>
          </div>
          </div>
          `;
        });
        output+='</div>';
        document.getElementById('results').innerHTML=output;
      });

}
function truncateText(text,limit)
{
  const shortened=text.indexOf(' ',limit);
  if(shortened==-1)return text;
  return text.substring(0,shortened);
}
