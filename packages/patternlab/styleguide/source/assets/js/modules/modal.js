/**
 * Accessible Modal Dialog System
 * WCAG 2.2 Compliant with focus management and keyboard navigation
 *
 * Key Accessibility Features:
 * - Focus automatically moves to first focusable element (close button) when dialog opens
 * - Focus is trapped within the dialog (Tab/Shift+Tab cycle through dialog elements only)
 * - Escape key closes dialog and returns focus to trigger button
 * - All close actions return focus to the element that opened the dialog
 * - ARIA attributes properly identify dialog role, label, and description
 * - Body scroll is prevented when modal is open
 * - Supports programmatic opening without trigger buttons
 */
class AccessibleModal {
    constructor(modalId, options = {}) {
        this.modal = document.getElementById(modalId);
        if (!this.modal) {
            console.error(`Modal with id "${modalId}" not found`);
            return;
        }

        this.dialog = this.modal.querySelector('.ads-modal-dialog');
        this.closeBtn = this.modal.querySelector('.ads-modal-close');
        this.cancelBtn = this.modal.querySelector('.ads-modal-btn-cancel');
        this.okBtn = this.modal.querySelector('.ads-modal-btn-ok');
        this.triggerElement = null;
        this.onOkCallback = options.onOk || null;

        // For focus management
        this.focusableElements = null;
        this.firstFocusableElement = null;
        this.lastFocusableElement = null;

        this.init();
    }

    init() {
        // Close button handler - closes and returns focus
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Cancel button handler - closes and returns focus
        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => this.close());
        }

        // OK button handler - executes callback, closes, and returns focus
        if (this.okBtn) {
            this.okBtn.addEventListener('click', () => this.handleOk());
        }

        // Click outside (backdrop/shim) to close - WCAG allows this as alternative method
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Prevent clicks inside dialog from closing (stop propagation)
        if (this.dialog) {
            this.dialog.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Keyboard navigation - handles Escape key and Tab trapping
        this.modal.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    /**
     * Get the first focusable element on the page (fallback for programmatic opening)
     * Typically this will be the "Skip to main content" link
     */
    getFallbackFocusElement() {
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input[type="text"]:not([disabled])',
            'input[type="radio"]:not([disabled])',
            'input[type="checkbox"]:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];

        // Find first focusable element in the entire document
        const allFocusable = document.querySelectorAll(focusableSelectors.join(','));

        // Filter out elements that are inside the modal itself
        for (let element of allFocusable) {
            if (!this.modal.contains(element)) {
                return element;
            }
        }

        // Fallback to body if nothing else is found
        return document.body;
    }

    /**
     * Open the modal
     * @param {HTMLElement|null} triggerElement - Optional element that triggered the modal
     * If null or not provided, focus will return to first focusable page element on close
     */
    open(triggerElement = null) {
        // Store reference to element that opened the dialog
        // If null, we'll use the fallback element when closing
        this.triggerElement = triggerElement;

        // Add active class to overlay to make it visible
        this.modal.classList.add('ads-active');

        // Add shim class for transparent background overlay
        this.modal.classList.add('ads-shim-active');

        // Prevent body scroll - improves usability and prevents confusion
        document.body.classList.add('ads-modal-open');

        // Update list of focusable elements within dialog
        this.updateFocusableElements();

        // Move focus to first focusable element (close button) after short delay
        // Delay ensures screen readers properly announce the dialog
        // WCAG 2.4.3 Focus Order - focus moves to dialog when it opens
        if (this.firstFocusableElement) {
            setTimeout(() => {
                this.firstFocusableElement.focus();
            }, 100);
        }
    }

    close() {
        // Remove active classes to hide modal
        this.modal.classList.remove('ads-active');
        this.modal.classList.remove('ads-shim-active');

        // Restore body scroll
        document.body.classList.remove('ads-modal-open');

        // Return focus to trigger element if it exists
        // Otherwise, return focus to first focusable element on page (skip link)
        // WCAG 2.4.3 Focus Order - focus returns to logical location
        if (this.triggerElement) {
            this.triggerElement.focus();
        } else {
            // Modal was opened programmatically without a trigger button
            // Return focus to first focusable element on the page
            const fallbackElement = this.getFallbackFocusElement();
            if (fallbackElement) {
                fallbackElement.focus();
            }
        }
    }

    handleOk() {
        // Execute custom callback if provided
        // This allows developers to add custom logic before closing
        if (this.onOkCallback && typeof this.onOkCallback === 'function') {
            this.onOkCallback();
        }

        // Close modal and return focus appropriately
        this.close();
    }

    updateFocusableElements() {
        // Get all focusable elements within the modal dialog
        // This list follows WCAG guidelines for keyboard accessibility
        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input[type="text"]:not([disabled])',
            'input[type="radio"]:not([disabled])',
            'input[type="checkbox"]:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ];

        this.focusableElements = this.dialog.querySelectorAll(focusableSelectors.join(','));
        this.firstFocusableElement = this.focusableElements[0]; // Close button is first
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
    }

    handleKeyDown(e) {
        // Close on Escape key - WCAG 2.1.2 No Keyboard Trap
        // Users must be able to close modal with keyboard
        if (e.key === 'Escape' || e.key === 'Esc') {
            e.preventDefault();
            this.close();
            return;
        }

        // Trap focus within modal - WCAG 2.4.3 Focus Order
        // Focus should cycle within the dialog and not escape to page behind
        if (e.key === 'Tab') {
            // If only one focusable element, prevent Tab from doing anything
            if (this.focusableElements.length === 1) {
                e.preventDefault();
                return;
            }

            if (e.shiftKey) {
                // Shift + Tab - moving backward
                if (document.activeElement === this.firstFocusableElement) {
                    e.preventDefault();
                    this.lastFocusableElement.focus();
                }
            } else {
                // Tab - moving forward
                if (document.activeElement === this.lastFocusableElement) {
                    e.preventDefault();
                    this.firstFocusableElement.focus();
                }
            }
        }
    }

    setOnOkCallback(callback) {
        // Allow dynamic setting of OK button callback
        this.onOkCallback = callback;
    }
}

// Initialize modals with custom callbacks
const modals = {};

// Create modal instances - each with optional custom OK callback
modals['modal-small'] = new AccessibleModal('modal-small', {
    onOk: function() {
        console.log('Small modal OK clicked');
        // Add your custom function here
        // Example: submit form data, save settings, etc.
    }
});

modals['modal-medium'] = new AccessibleModal('modal-medium', {
    onOk: function() {
        console.log('Medium modal OK clicked');
        // Add your custom function here
    }
});

modals['modal-large'] = new AccessibleModal('modal-large', {
    onOk: function() {
        console.log('Large modal OK clicked');
        // Add your custom function here
    }
});

// Setup trigger buttons when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const triggers = document.querySelectorAll('[data-modal-trigger]');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-trigger');
            if (modals[modalId]) {
                // Open the corresponding modal, passing the trigger button
                // for focus return when modal closes
                modals[modalId].open(this);
            }
        });
    });
});

// Export for use in other scripts if needed
window.AccessibleModal = AccessibleModal;
window.modals = modals;
