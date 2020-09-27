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
db.collection('Furniture').where('Category', '==', categoryName).where('SubCategory', '==',SubCategoryName).orderBy('ProductCode',"asc").get().then(snapshot => {
    snapshot.docs.forEach((doc) => {
        count++;
        cnt.innerText=count;
        addToList(doc.data());
        //addToArray(doc.data().ProductCode);
        Display(doc.data());
    })
}).then(()=>{
    setInterval(()=>{AOS.init({duration: 1200});},1500)  //add Animate On Scroll here
})
.catch(err => {
    console.log(err);
});

const Display = (details) => {
    console.log(details)
    let html = `
                <div class="col-xl-3 col-lg-4 col-sm-6 mb--50" data-aos="fade-up">
                    <div class="ft-product">
                        <div class="product-inner" data-aos="fade-up">
                            <div class="product-image">
                                <figure class="product-image--holder">
                                    <a href=${details.url} data-lightbox="collection">
                                        <img src=${details.url} alt=${details.ProductName}  class="img-fluid fireImage" >
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
    ImageRow.innerHTML += html;
}

function addToList(data){
    console.log(data);
    var catName = data.Category;
    catName= catName.toLowerCase();
    Tag1.innerText= data.Category+' Furniture';
    Tag2.innerHTML=`<a href= "${catName}.html" style="color:black;" >${data.Category} Furniture</a>`;
    Tag3.innerText= data.SubCategory;
}
