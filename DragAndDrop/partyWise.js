(function() {
    window.onload = init;
    var senators = [];
    var localStorageKey = 'senators_Nandhakumar';  
    
    function init() {
        // Check if data is available in localStorage
        var storedSenators = localStorage.getItem(localStorageKey);
        if (storedSenators) {
            senators = JSON.parse(storedSenators);
            msg.textContent = "From LocalStorage loaded " + senators.length + " senators";
            populateLists();  // Populate the lists with data from localStorage
        } else {
            loadFromAjax();  // Load data from AJAX if localStorage is empty
        }
        
        // Add drag events to drop zones
        setupDropZones();
    }

    // Function to load senators from the AJAX call (partyList.xml)
    function loadFromAjax() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'partyList.xml', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var xml = xhr.responseXML;
                var senatorNodes = xml.getElementsByTagName('senator');
                for (var i = 0; i < senatorNodes.length; i++) {
                    var name = senatorNodes[i].getElementsByTagName('name')[0].textContent;
                    var party = senatorNodes[i].getElementsByTagName('party')[0].textContent;
                    senators.push({ name: name, party: party, voted: false });
                }
                localStorage.setItem(localStorageKey, JSON.stringify(senators));
                populateLists();
            }
        };
        xhr.send();
    }

    // Function to populate the lists (Members, Democrats, Republicans)
    function populateLists() {
        var membersList = document.getElementById('members');
        var democratsList = document.getElementById('democrats');
        var republicansList = document.getElementById('republicans');
        
        membersList.innerHTML = '';
        democratsList.innerHTML = '';
        republicansList.innerHTML = '';
        
        senators.forEach(function(senator, index) {
            // Always add senator to the members list
            var li = document.createElement('li');
            li.textContent = senator.name;
            li.setAttribute('draggable', true);
            li.setAttribute('data-index', index);
            li.classList.add(senator.party === 'Democrat' ? 'democrat' : 'republican');
            
            // Attach drag events
            li.addEventListener('dragstart', dragStartHandler);
            li.addEventListener('dragend', dragEndHandler);
            li.addEventListener('drag', dragHandler);

            membersList.appendChild(li);
            
            // Check if the senator has already voted and populate the correct drop zone
            if (senator.voted) {
                var votedLi = document.createElement('li');
                votedLi.textContent = senator.name;
                votedLi.classList.add('votedBlack'); // Add the black class for dropped items
                if (senator.party === 'Democrat') {
                    democratsList.appendChild(votedLi);
                } else {
                    republicansList.appendChild(votedLi);
                }
            }
        });
    }

    // Set up drag and drop zones
    function setupDropZones() {
        var democratsList = document.getElementById('democrats');
        var republicansList = document.getElementById('republicans');
        
        democratsList.addEventListener('dragenter', dragEnterDemocratsHandler);
        democratsList.addEventListener('dragover', allowDrop);
        democratsList.addEventListener('drop', dropDemocratsHandler);
        
        republicansList.addEventListener('dragenter', dragEnterRepublicansHandler);
        republicansList.addEventListener('dragover', allowDrop);
        republicansList.addEventListener('drop', dropRepublicansHandler);
    }

    // Drag start handler
    function dragStartHandler(e) {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-index'));
        e.target.classList.add('dragged');
    }

    // Drag end handler
    function dragEndHandler(e) {
        msg.textContent = "Drag ended";
        e.target.classList.remove('dragged');
    }

    // Drag handler to show which senator is being dragged
    function dragHandler(e) {
        document.getElementById('msg').textContent = "Dragging " + e.target.textContent;
    }

    // Allow drop by preventing the default
    function allowDrop(e) {
        e.preventDefault();
    }

    // Democrat drag enter handler
    function dragEnterDemocratsHandler(e) {
        e.preventDefault();
    }

    // Republican drag enter handler
    function dragEnterRepublicansHandler(e) {
        e.preventDefault();
    }

    // Drop into Democrats
    function dropDemocratsHandler(e) {
        e.preventDefault();
        var index = e.dataTransfer.getData('text');
        var senator = senators[index];

        if (senator.party === 'Democrat' && !senator.voted) {
            senator.voted = true;
            localStorage.setItem(localStorageKey, JSON.stringify(senators));
            populateLists();  // Re-populate lists after update
        }
    }

    // Drop into Republicans
    function dropRepublicansHandler(e) {
        e.preventDefault();
        var index = e.dataTransfer.getData('text');
        var senator = senators[index];

        if (senator.party === 'Republican' && !senator.voted) {
            senator.voted = true;
            localStorage.setItem(localStorageKey, JSON.stringify(senators));
            populateLists();  // Re-populate lists after update
        }
    }
})();