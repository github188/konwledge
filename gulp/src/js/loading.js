let loading = {
    body:null,
    loadingBg:null,
    open(){
        this.loadingBg = document.createElement("div");
        this.loadingBg.className="loading";
        let str = '\n' +
            '<div class="loading"> <span></span> <span></span> <span></span> <span></span> <span></span> </div>'
        this.loadingBg.innerHTML=str;
        this.body=document.querySelector("body");
        this.body.appendChild(this.loadingBg);
    },
    close(){
        this.body.removeChild(this.loadingBg);
    }
};