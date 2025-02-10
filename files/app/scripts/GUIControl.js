document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.terminal-button');
    const sections = document.querySelectorAll('.section-content');

    // Function to show selected section
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });

        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.remove('hidden');
            selectedSection.classList.add('active');
            
            // Add typing animation to new content
            const typingElements = selectedSection.querySelectorAll('.typing');
            typingElements.forEach(element => {
                element.style.animation = 'none';
                element.offsetHeight; // Trigger reflow
                element.style.animation = null;
            });
        }
    }

    // Add click handlers to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Update active button state
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Protocol category switching
    const protocolButtons = document.querySelectorAll('.protocol-category');
    const protocolContents = document.querySelectorAll('.protocol-category-content');

    protocolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            protocolButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected category
            protocolContents.forEach(content => {
                content.classList.add('hidden');
                if (content.id === category) {
                    content.classList.remove('hidden');
                }
            });
        });
    });
});

// Enhanced report viewer functionality
document.addEventListener('DOMContentLoaded', function() {
    const reportButtons = document.querySelectorAll('.report-button');
    const reportViewer = document.querySelector('.report-viewer');
    const closeViewer = document.querySelector('.close-viewer');
    const closeButton = document.querySelector('.close-button');
    const loadingSequence = document.querySelector('.loading-sequence');
    const reportDetails = document.querySelector('.report-details');

    const showErrorSequence = () => {
        reportViewer.classList.remove('hidden');
        loadingSequence.classList.remove('hidden');
        reportDetails.classList.add('hidden');
        
        // Show error sequence after loading animation
        setTimeout(() => {
            loadingSequence.classList.add('hidden');
            reportDetails.classList.remove('hidden');
        }, 4000);
    };

    reportButtons.forEach(button => {
        button.addEventListener('click', showErrorSequence);
    });

    // Edit button functionality (to be implemented)
    const editButton = document.querySelector('.edit-button');
    editButton.addEventListener('click', showErrorSequence);

    // Close viewer handlers
    [closeViewer, closeButton].forEach(button => {
        button.addEventListener('click', () => {
            reportViewer.classList.add('hidden');
        });
    });

    // Close viewer when clicking outside
    reportViewer.addEventListener('click', function(e) {
        if (e.target === reportViewer) {
            reportViewer.classList.add('hidden');
        }
    });
});

// MTF Selection Handling
document.addEventListener('DOMContentLoaded', function() {
    const mtfSelector = document.getElementById('mtfSelector');
    const addMTFButton = document.getElementById('addMTFUnit');
    const selectedMTFList = document.querySelector('.selected-mtf-list');
    const availableUnits = document.querySelectorAll('.available-units .mtf-unit');

    if (addMTFButton && mtfSelector) {
        addMTFButton.addEventListener('click', function() {
            const selectedValue = mtfSelector.value;
            if (selectedValue) {
                // Remove empty message if present
                const emptyMessage = selectedMTFList.querySelector('.empty-message');
                if (emptyMessage) {
                    emptyMessage.remove();
                }

                // Find the selected unit in available units and clone it
                const selectedUnit = document.querySelector(`.available-units .mtf-unit[data-mtf="${selectedValue}"]`);
                if (selectedUnit) {
                    const clonedUnit = selectedUnit.cloneNode(true);
                    
                    // Add remove button
                    const removeButton = document.createElement('button');
                    removeButton.className = 'terminal-button warning';
                    removeButton.textContent = 'REMOVE UNIT';
                    removeButton.onclick = function() {
                        clonedUnit.remove();
                        // Add empty message if no units left
                        if (selectedMTFList.children.length === 0) {
                            selectedMTFList.innerHTML = `
                                <div class="mtf-unit empty-message">
                                    <p>NO UNITS CURRENTLY ASSIGNED</p>
                                </div>
                            `;
                        }
                    };
                    clonedUnit.appendChild(removeButton);
                    
                    selectedMTFList.appendChild(clonedUnit);
                }
            }
        });
    }
});

// MTF Selection System
document.addEventListener('DOMContentLoaded', function() {
    const availableList = document.getElementById('availableUnits');
    const assignedList = document.getElementById('assignedUnits');

    if (availableList && assignedList) {
        // Verbesserte Click-Handler-Funktion
        function handleUnitClick(e) {
            const item = e.target;
            if (!item.classList.contains('mtf-item')) return;

            console.log('Unit clicked:', item.textContent); // Debug-Output

            // Create assigned unit
            const assignedUnit = document.createElement('div');
            assignedUnit.className = 'mtf-item assigned';
            assignedUnit.textContent = item.textContent;

            // Add remove button
            const removeButton = document.createElement('span');
            removeButton.textContent = '×';
            removeButton.className = 'remove-button';
            removeButton.onclick = function(e) {
                e.stopPropagation();
                assignedUnit.remove();

                // Show empty message if no units left
                if (assignedList.children.length === 0) {
                    assignedList.innerHTML = '<div class="empty-message">NO UNITS CURRENTLY ASSIGNED</div>';
                }
            };
            assignedUnit.appendChild(removeButton);

            // Remove empty message if present
            const emptyMessage = assignedList.querySelector('.empty-message');
            if (emptyMessage) {
                emptyMessage.remove();
            }

            // Add to assigned list
            assignedList.appendChild(assignedUnit);
        }

        // Event-Delegation für bessere Performance
        availableList.addEventListener('click', handleUnitClick);
    }
});
