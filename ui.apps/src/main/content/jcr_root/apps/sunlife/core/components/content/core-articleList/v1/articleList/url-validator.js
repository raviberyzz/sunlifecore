"use strict";

use(function () {
    let items = this.items;
    let count = 0;
    let newItems = [];
    let page = currentPage.path;
    items.forEach(item => {
        if(count < 3){
            item.elements.forEach(element => {
                if (element.name == 'articlePageLink') {
                    let link = element.value.split('.html').join('');
                    if(link != page){
                        newItems.push(item);
                        count++;
                    }
                }
            });
        }
    });
    return {
        newItems: newItems
    }
});