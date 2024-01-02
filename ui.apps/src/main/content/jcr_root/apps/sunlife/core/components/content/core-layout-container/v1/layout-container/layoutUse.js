"use strict";
use(function () {
    var cols = this.column;
    var grid = this.grid;
    var columns = [];
    var numberOfContainers = 1;

    switch (cols) {
        case 'full':
            columns.push('col-12');
            break;
        case 'halves':
            numberOfContainers = 2
            columns.push('col-md-6', 'col-md-6');
            break;
        case 'thirds':
            numberOfContainers = 3
            columns.push('col-md-4', 'col-md-4', 'col-md-4' );
            break;
        case 'fourths':
            numberOfContainers = 4
            columns.push('col-md-3', 'col-md-3', 'col-md-3', 'col-md-3');
            break;
        case '8GridOnly':
            numberOfContainers = 1
            columns.push('col-lg-8 col-12');
            break;
        case 'article':
            numberOfContainers = 2
            columns.push('col-lg-8', 'offset-lg-1 col-lg-3');
            break;
        case 'leftnav':
            numberOfContainers = 3
            columns.push('col-lg-3', 'offset-lg-1 col-lg-8');
            break;
        case 'custom':
            generateCustomGrid();
            break;
        default:
            columns.push('col-12');
            break;
    }


    function generateCustomGrid() {
        numberOfContainers = 2;
        for (let i = 0; i < grid.length; i++) {
            columns.push(getGridCol(grid[i]));
        }
    }

    function getGridCol(col) {
        var lg = getMediaSpecificGrid('lg', col.desktop);
        var md = getMediaSpecificGrid('sm', col.tablet);
        var xs = getMediaSpecificGrid('xs', col.mobile);
        var mediaConfigArray = [lg,md,xs];
        return  mediaConfigArray.filter(function(item,index) { 
            return mediaConfigArray.indexOf(item) === index;
        }).join(' ');
    }
    
    function getMediaSpecificGrid(media, config) {
        var col = '';
        var offset = '';
        var colsAndOffsetClassesArray=[];
        if(config[0] > 0) {
            col = media != 'xs' ? 'col-'+media+'-'+config[0] : 'col-'+config[0];
        }
        offset = media != 'xs' ? 'offset-'+media+'-'+config[1] : 'offset-'+config[1];
        
        if(col=='') {
            col = 'col';
        }
        
        colsAndOffsetClassesArray.push(col);
        if(offset != '') {
            colsAndOffsetClassesArray.push(offset); 
        } 
        return colsAndOffsetClassesArray.join(' ');
    }

    return {
        columns: columns,
        numberOfContainers: numberOfContainers
    };
});
