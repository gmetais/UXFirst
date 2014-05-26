(function(global){
    var doc = global.document;
    var storage = global.localStorage;
    var perf = global.performance;

    if (!doc.addEventListener) {
        return;
    }

    // Only keep the metrics for the last 2 hours
    var timeout = 7200000;

    var startTime = Date.now();

    // Wait for the document ready event
    function checkIfDocumentIsComplete() {
        if (doc.readyState === 'complete') {
            setTimeout(saveLoadTime, 2);
            return true;
        }
        return false;
    }
    if (!checkIfDocumentIsComplete()) {
        doc.addEventListener('readystatechange', checkIfDocumentIsComplete);
    }

    // Get the load time from the Timing API (if available)
    function saveLoadTime() {
        var currentPageLoadTime;
        var newData = [];

        if (perf && perf.timing) {
            currentPageLoadTime = perf.timing.loadEventEnd - perf.timing.fetchStart;
        } else {
            // For browsers that don't support Navigation API
            currentPageLoadTime = Date.now() - startTime;
        }

        // Get the previous pages timings
        var localData = readLocalStorage();

        // Remove the timings too old
        for (var i=0, max=localData.length ; i<max ; i++) {
            if (localData[i].d + timeout > startTime) {
                newData.push(localData[i]);
            }
        }

        // Add the new timing
        newData.push({
            d: startTime,
            l: currentPageLoadTime
        });

        // Save
        storage.setItem('uxfirst', JSON.stringify(newData));
    }

    function readLocalStorage() {
        var localData = storage.getItem('uxfirst');
        if (!localData) {
            return [];
        }
        return JSON.parse(localData);
    }


    global.uxFirst = function() {
            var localData = readLocalStorage();
            var sum = 0;

            for (var i=0, max=localData.length ; i<max ; i++) {
                sum += localData[i].l;
            }

            return Math.round(sum / localData.length) || null;
    };

}(this));