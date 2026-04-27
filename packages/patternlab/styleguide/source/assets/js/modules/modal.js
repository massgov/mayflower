import focusTrapping from "../helpers/focusTrapping.js";

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
    constructor(modalReference, options = {}) {
        this.modal = typeof modalReference === 'string'
            ? document.getElementById(modalReference)
            : modalReference;

        if (!this.modal) {
            console.error('Modal not found:', modalReference);
            return;
        }

        this.dialog = this.modal.querySelector('.ma__modal-dialog');
        this.closeBtn = this.modal.querySelector('.ma__modal-close');
        this.showOriginalBtn = this.modal.querySelector('.ma__modal-btn-show-original');
        this.translateBtn = this.modal.querySelector('.ma__modal-btn-translate');
        this.triggerElement = null;
        this.onOkCallback = options.onOk || null;

        // For focus management
        this.focusableElements = null;
        this.firstFocusableElement = null;
        this.lastFocusableElement = null;
        this.boundHandleKeyDown = (e) => this.handleKeyDown(e);
        this.boundHandleFocusIn = (e) => this.handleFocusIn(e);

        this.init();
    }

    init() {
        // Close button handler - closes and returns focus
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Cancel button handler - closes and returns focus
        if (this.showOriginalBtn) {
            this.showOriginalBtn.addEventListener('click', () => this.close());
        }

        // OK button handler - executes callback, closes, and returns focus
        if (this.translateBtn) {
            this.translateBtn.addEventListener('click', () => this.handleOk());
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

        // Keyboard navigation and focus trapping are handled at the document level
        // so focus cannot escape the dialog while it is open.
        document.addEventListener('keydown', this.boundHandleKeyDown);
        document.addEventListener('focusin', this.boundHandleFocusIn);
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
        this.modal.classList.add('ma__active');

        // Add shim class for transparent background overlay
        this.modal.classList.add('ma__shim-active');

        // Prevent body scroll - improves usability and prevents confusion
        document.body.classList.add('ma__modal-open');

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
        this.modal.classList.remove('ma__active');
        this.modal.classList.remove('ma__shim-active');

        // Restore body scroll
        document.body.classList.remove('ma__modal-open');

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

        this.focusableElements = Array.from(
            this.dialog.querySelectorAll(focusableSelectors.join(','))
        ).filter((element) => {
            if (element.disabled) {
                return false;
            }

            if (element.getAttribute('aria-hidden') === 'true') {
                return false;
            }

            return element.getClientRects().length > 0;
        });

        this.firstFocusableElement = this.focusableElements[0]; // Close button is first
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
    }

    isOpen() {
        return this.modal.classList.contains('ma__active');
    }

    handleKeyDown(e) {
        if (!this.isOpen()) {
            return;
        }

        // Close on Escape key - WCAG 2.1.2 No Keyboard Trap
        // Users must be able to close modal with keyboard
        if (e.key === 'Escape' || e.key === 'Esc') {
            e.preventDefault();
            this.close();
            return;
        }

        // Trap focus within modal - WCAG 2.4.3 Focus Order
        // Focus should cycle within the dialog and not escape to page behind.
        if (e.key === 'Tab') {
            this.updateFocusableElements();

            if (!this.focusableElements.length) {
                e.preventDefault();
                if (this.closeBtn) {
                    this.closeBtn.focus();
                }
                return;
            }

            if (!this.dialog.contains(document.activeElement)) {
                e.preventDefault();
                if (e.shiftKey) {
                    this.lastFocusableElement.focus();
                } else {
                    this.firstFocusableElement.focus();
                }
                return;
            }

            focusTrapping({
                modalSelector: `#${this.modal.id}`,
                keyEvent: e
            });
        }
    }

    handleFocusIn(e) {
        if (!this.isOpen()) {
            return;
        }

        if (this.dialog.contains(e.target)) {
            return;
        }

        this.updateFocusableElements();

        if (this.firstFocusableElement) {
            this.firstFocusableElement.focus();
        } else if (this.closeBtn) {
            this.closeBtn.focus();
        }
    }

    setOnOkCallback(callback) {
        // Allow dynamic setting of OK button callback
        this.onOkCallback = callback;
    }
}

const modals = {};

// Setup trigger buttons when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const modalElements = Array.from(document.querySelectorAll('.ma__modal'));
    const triggerElements = Array.from(document.querySelectorAll('[data-modal-trigger]'));
    const autoGeneratedPrefix = 'ma__modal-auto';
    const originalIdCounts = modalElements.reduce((counts, modalElement) => {
        const originalId = modalElement.id;

        if (originalId) {
            counts[originalId] = (counts[originalId] || 0) + 1;
        }

        return counts;
    }, {});
    const unboundTriggers = [];

    modalElements.forEach((modalElement, index) => {
        const originalId = modalElement.id;
        const hasUniqueOriginalId = Boolean(originalId) && originalIdCounts[originalId] === 1;
        const modalId = hasUniqueOriginalId ? originalId : `${autoGeneratedPrefix}-${index + 1}`;
        const titleElement = modalElement.querySelector('.ma__modal-title');
        const titleId = `${modalId}-title`;

        modalElement.id = modalId;
        modalElement.setAttribute('aria-labelledby', titleId);

        if (titleElement) {
            titleElement.id = titleId;
        }

        modals[modalId] = new AccessibleModal(modalElement, {});
    });

    triggerElements.forEach((trigger) => {
        const requestedModalId = trigger.getAttribute('data-modal-trigger');

        if (requestedModalId && originalIdCounts[requestedModalId] === 1 && modals[requestedModalId]) {
            trigger.setAttribute('aria-controls', requestedModalId);
            return;
        }

        unboundTriggers.push(trigger);
    });

    unboundTriggers.forEach((trigger, index) => {
        const modalElement = modalElements[index];

        if (!modalElement) {
            return;
        }

        trigger.setAttribute('data-modal-trigger', modalElement.id);
        trigger.setAttribute('aria-controls', modalElement.id);
    });

    triggerElements.forEach(trigger => {
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
