$(document).ready(function(){
    var segment = ContextHub.SegmentEngine.getResolvedSegments();
    var segmentArray = [];
    for(i=0;i<segment.length;i++){
    segmentArray.push(segment[i]["title"]);
    }
    utag_data['user_segment'] = segmentArray;
});