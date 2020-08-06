const db = firebase.firestore();

const ImageRow = document.querySelector('.Products-row');

var category= document.querySelector('.firebase');

var cnt= document.querySelector('.count');

var SubCategory= document.querySelector('.sub');

var categoryName=category.innerText;

var SubCategoryName=SubCategory.innerText;

var Tag1= document.querySelector('.TAG1');

var Tag2= document.querySelector('.TAG2');

var Tag3= document.querySelector('.TAG3');

let count=0;
db.collection('Furniture').where('Category', '==', categoryName).where('SubCategory', '==',SubCategoryName).orderBy('ProductName').get().then(snapshot => {
    snapshot.docs.forEach((doc) => {
        count++;
        cnt.innerText=count;
        addToList(doc.data());
        addToArray(doc.data().ProductCode);
        Display(doc.data());
    })
}).then(()=>{
    console.log(NameArray);
    NameArray.forEach((data)=>{
        let Image = document.querySelector(`.${data}`);
        console.log(Image);
        Image.classList.add('animate__animated');
        Image.classList.add('animate__fadeInUp');
    })
})
.catch(err => {
    console.log(err);
});

//lighthouse- lokesh
// <a href="assets/images/image1.jpg" data-lightbox="image-1" data-title="My caption"><img src="assets/thumbnails/thumb1.jpg" alt="Surfing"/>
// </a>

//<div>Name: ${location.name || location.FORMATTED} </div>
const Display = (details) => {
    console.log(details)
    let html = `
                <div class="col-xl-3 col-lg-4 col-sm-6 mb--50">
                    <div class="ft-product">
                        <div class="product-inner">
                            <div class="product-image">
                                <figure class="product-image--holder">
                                    <a href=${details.url} data-lightbox="collection">
                                        <img src=${details.url} alt=${details.ProductName} class="img-fluid fireImage ${details.ProductCode}">
                                    </a>
                                </figure>
                                <a href=${details.url} data-lightbox="collection2"></a>
                                <div class="product-action">
                                    <a data-toggle="modal" href=${details.url} data-target="#productModal" data-lightbox="collection3" class="action-btn">
                                        <i class="la la-eye"></i>
                                    </a>
                                    <a href="contact-us.html" class="action-btn">
                                        <i class="la la-repeat"></i>
                                    </a>
                                 </div>
                            </div>
                            <div class="product-info">
                                <h5 class="product-category" style="text-align: center;">
                                    <a data-lightbox="collection4" href=${details.url}>${details.ProductName}</a>
                                </h5>
                                <h6 class="money" style="text-align: center; color:gray"><a data-lightbox="collection5" href=${details.url}>${details.ProductCode}</a></h6>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    //addImages(details.name);
    ImageRow.innerHTML += html;
}

let NameArray=[];
function addToArray(Code){
    NameArray.push(Code);
}

function addToList(data){
    console.log(data);
    //let ListItem= data.Product;

    Tag1.innerText= data.Category+' Furniture';
    Tag2.innerText= data.Category+' Furniture';
    Tag3.innerText= data.SubCategory;
    

    //let LIST= document.createElement('li');
    // LIST.textContent=ListItem;
    // LIST.classList.add('option');

    // let aTag= document.createElement('a');
    // aTag.href=data.Product + data.tag + ".html";
    /*LIST.innerHTML += `
    <li>
        <a href=${data.Product+data.tag+'.html'} >
            <span class="category-title">${ListItem}</span>
            <i class="fa fa-angle-double-right"></i>
        </a>
    </li>`;

    list.appendChild(LIST);
    
    // let Option= document.createElement('option');
    // Option.textContent= ListItem;
    // Option.value= url;

    // options.appendChild(Option);
    // console.log(Option);
*/
}
