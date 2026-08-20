const cart=[];

const faDigits=n=>String(n).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);
const money=n=>faDigits(n.toLocaleString("en-US"))+" تومان";

const toast=document.getElementById("toast");
function showToast(msg){
  toast.textContent=msg;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2200);
}

function renderCart(){
  const box=document.getElementById("cartItems");
  const total=cart.reduce((s,i)=>s+i.price,0);
  document.getElementById("cartCount").textContent=faDigits(cart.length);
  document.getElementById("cartTotal").textContent=money(total);
  if(!cart.length){
    box.innerHTML='<div class="empty-cart">سبد خرید شما خالی است.</div>';
    return;
  }
  box.innerHTML=cart.map((item,i)=>`
    <div class="cart-item">
      <span>${item.name}</span>
      <span>${money(item.price)} <button onclick="removeItem(${i})" style="border:0;background:none;color:#d65e79;cursor:pointer">×</button></span>
    </div>`).join("");
}
function removeItem(i){cart.splice(i,1);renderCart();}

document.querySelectorAll(".add-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    cart.push({name:btn.dataset.name,price:Number(btn.dataset.price)});
    renderCart();
    showToast("محصول به سبد خرید اضافه شد.");
  });
});

const panel=document.getElementById("cartPanel");
const backdrop=document.getElementById("cartBackdrop");
function toggleCart(open){
  panel.classList.toggle("open",open);
  backdrop.classList.toggle("show",open);
  panel.setAttribute("aria-hidden",String(!open));
}
document.getElementById("cartButton").addEventListener("click",()=>toggleCart(true));
document.getElementById("closeCart").addEventListener("click",()=>toggleCart(false));
backdrop.addEventListener("click",()=>toggleCart(false));

document.querySelector(".menu-toggle").addEventListener("click",()=>{
  document.querySelector(".nav").classList.toggle("open");
});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".nav").classList.remove("open")));

document.getElementById("newsletterForm").addEventListener("submit",e=>{
  e.preventDefault();
  showToast("با موفقیت عضو خبرنامه شدید.");
  e.target.reset();
});

document.getElementById("showMore").addEventListener("click",()=>{
  showToast("در نسخه فروشگاهی، این دکمه به صفحه همه محصولات متصل می‌شود.");
});

document.querySelector(".checkout").addEventListener("click",()=>{
  if(!cart.length){showToast("سبد خرید شما خالی است.");return;}
  showToast("اتصال به درگاه پرداخت در نسخه نهایی انجام می‌شود.");
});

renderCart();
