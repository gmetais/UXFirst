(function(global, doc){

    // Only keep the metrics for the last 2 hours
    var timeout = 120;

    var startTime = new Date().getTime();

    // Wait for the document ready event
    function checkIfDocumentIsComplete() {
        if (doc.readyState === 'complete') {
            setTimeout(saveLoadTime, 2);
            return true;
        }
        return false;
    }
    if (!checkIfDocumentIsComplete() && doc.addEventListener) {
        doc.addEventListener('readystatechange', checkIfDocumentIsComplete);
    }

    // Get the load time from the Timing API (if available)
    function saveLoadTime() {
        var currentPageLoadTime;
        var newData = [];

        if (global.performance && global.performance.timing) {
            currentPageLoadTime = global.performance.timing.loadEventEnd - global.performance.timing.fetchStart;
        } else {
            // For browsers that don't support Navigation API
            currentPageLoadTime = new Date().getTime() - startTime;
        }

        // Get the previous pages timings
        var localData = readLocalStorage();

        // Remove the timings too old
        for (var i=0, max=localData.length ; i<max ; i++) {
            if (localData[i].date + (timeout * 60000) > startTime) {
                newData.push(localData[i]);
            }
        }

        // Add the new timing
        newData.push({
            date: startTime,
            load: currentPageLoadTime
        });

        // Save
        global.localStorage.setItem('uxfirst', JSON.stringify(newData));
    }

    function readLocalStorage() {
        var localData = global.localStorage.getItem('uxfirst');
        if (!localData) {
            return [];
        }
        return JSON.parse(localData);
    }


    global.UXFirst = {
        score : function() {
            // Max score is 100 when loadtime is <= 1s
            // Min score is 0 when loadtime is >= 15s
            // Between, the curve is linear
            var avg = this.avg();
            if (avg === null) {
                return null;
            }
            return Math.min(Math.max((750 - (avg / 20)) / 7, 0), 100);
        },

        avg : function() {
            var localData = readLocalStorage();
            var sum = 0;

            if (!localData.length) {
                return null;
            }

            for (var i=0, max=localData.length ; i<max ; i++) {
                sum += localData[i].load;
            }

            return Math.round(sum / localData.length);
        }
    };

}(this, this.document));