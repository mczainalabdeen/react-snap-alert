class SnapAlert {
    constructor() {
        this.defaultOptions = {
            rtl: false,
            type: 'info',
            title: 'Default Title',
            message: 'This is a default message',
            icon: null,
            customIcon: null,
            confirmText: 'OK',
            enableConfirm: false,
            onConfirm: function () { },
  
            cancelText: 'Cancel',
            enableCancel: false,
            onCancel: function () { },
  
            enableCloseHandler: false,
            onClose: () => { },
            clickToClose: false,
            autoClose: true,
            duration: 3000,
            progressBar: true,
            isDark: false,
            position: 'top left',
            animation: 'slide',
            html: ``,
        };
  
        this.icons = {
            success: "bx-check",
            warning: "bx-bell",
            error: "bx-error",
            info: "bx-info-circle",
        };
  
        this.positions = {
            "top center": "snapAlert-top-center",
            "bottom center": "snapAlert-bottom-center",
            "top left": "snapAlert-top-left",
            "top right": "snapAlert-top-right",
            "bottom left": "snapAlert-bottom-left",
            "bottom right": "snapAlert-bottom-right",
        };
  
        this.setOptions = {};
    }
  
    // Function to set global options
    Options(options) {
        this.setOptions = { ...this.setOptions, ...options };
    }
  
    // Function to create alerts
    createAlert(type = null, title = null, message = null, options = {}) {
        const settings = { ...this.defaultOptions, ...this.setOptions, ...options };
  
        if (type && type !== "html") {
            settings.type = type;
        } else if (type === "html") {
            settings.type = type;
            settings.code = title;
        }
        settings.title = title;
        settings.message = message;
  
        let notClosed = true;
  
        // Create container if it doesn't exist
        let container = document.querySelector(
            `.snapAlert-container.${this.positions[settings.position]}.snapAlert-animation-${settings.animation}`
        );
        if (!container) {
            const alertDiv = document.createElement('div');
            alertDiv.classList.add(
                'snapAlert-container',
                this.positions[settings.position],
                `snapAlert-animation-${settings.animation}`
            );
            //document.body.appendChild(alertDiv);
            document.body.querySelector('#root').appendChild(alertDiv);
            container = alertDiv;
        }
  
        const modal = document.createElement('div');
        if (settings.type !== 'html') {
            modal.innerHTML = `
                <div class="${settings.rtl ? 'snapAlert-rtl' : ''} snapAlert-item snapAlert-${settings.type} ${settings.clickToClose ? 'snapAlert-clickable' : ''} ${settings.isDark ? 'snapAlert-dark' : ''} ${!settings.progressBar ? 'progress-hide' : ''}">
                    <div class="snapAlert-main">
                        <div class="snapAlert-icon">${settings.customIcon ? settings.customIcon : `<i class="bx ${settings.icon ?? this.icons[settings.type]}"></i>`}</div>
                        <div>
                            <div class="snapAlert-title">${settings.title}</div>
                            <div class="snapAlert-message">${settings.message}</div>
                            <div class="snapAlert-actions">
                                ${settings.enableConfirm ? `<button class="snapAlert-action snapAlert-action-confirm" snap-alert-confirm>${settings.confirmText}</button>` : ''}
                                ${settings.enableCancel ? `<button class="snapAlert-action snapAlert-action-cancel" snap-alert-cancel>${settings.cancelText}</button>` : ''}
                            </div>
                        </div>
                        ${settings.progressBar ? `<div style='--snapAlert-progress-duration:${settings.duration / 1000}s' class='snapAlert-progress-bar'></div>` : ''}
                        <button class="snapAlert-close" snap-alert-close><i class='bx bx-x'></i></button>
                    </div>
                </div>
            `;
        } else {
            modal.innerHTML = `
                <div class="${settings.rtl ? 'snapAlert-rtl' : ''} snapAlert-html snapAlert-item snapAlert-${settings.type} ${settings.clickToClose ? 'snapAlert-clickable' : ''}">
                    ${settings.code}
                </div>
            `;
        }
  
        const modalContent = modal.querySelector('.snapAlert-item');
        container.appendChild(modal);
  
        setTimeout(() => {
            modalContent.classList.add(`snapAlert-${settings.animation}-in`);
        }, 10);
  
        if (settings.autoClose) {
            setTimeout(() => {
                closeAndRemove();
            }, settings.duration);
        }
  
        // Close and remove alert
        const closeAndRemove = ($is_actions = false) => {
            modalContent.classList.remove(`snapAlert-${settings.animation}-in`);
            modalContent.classList.add(`snapAlert-${settings.animation}-out`);
  
            setTimeout(() => {
                modal.remove();
                if (!document.querySelectorAll(`.snapAlert-container.${this.positions[settings.position]} > div`).length) {
                    container.remove();
                }
            }, settings.animation === 'slide' ? 55 : 100);
  
            if (settings.enableCloseHandler && notClosed && !$is_actions) {
                setTimeout(() => {
                    notClosed = false;
                    settings.onClose();
                }, 50);
            }
        };
  
        // Event listeners
        modal.querySelector('[snap-alert-confirm]')?.addEventListener('click', () => {
            settings.onConfirm();
            closeAndRemove();
        });
  
        modal.querySelector('[snap-alert-cancel]')?.addEventListener('click', () => {
            settings.onCancel();
            closeAndRemove();
        });
  
        modal.querySelector('[snap-alert-close]')?.addEventListener('click', () => {
            closeAndRemove();
        });
  
        modal.querySelector('.snapAlert-clickable')?.addEventListener('click', () => {
            closeAndRemove();
        });
    }
  
    // Clear all alerts
    clearAll() {
        const allAlerts = document.querySelectorAll('.snapAlert-container > div');
        allAlerts.forEach((alert, key) => {
            setTimeout(() => {
                alert.classList.remove('snapAlert-slide-in');
                alert.classList.add('snapAlert-slide-out');
            }, key * 20);
  
            setTimeout(() => {
                alert.remove();
            }, 300 + key * 20);
        });
  
        const allContainers = document.querySelectorAll('.snapAlert-container');
        allContainers.forEach((container) => {
            setTimeout(() => {
                if (!container.hasChildNodes()) {
                    container.remove();
                }
            }, 2000);
        });
    }
  
  
    success(title, message, options){
      this.createAlert('success' , title, message, options);
    }
    error(title, message, options){
      this.createAlert('error' , title, message, options);
    }
    warning(title, message, options){
      this.createAlert('warning' , title, message, options);
    }
    info(title, message, options){
      this.createAlert('info' , title, message, options);
    }
    alert(title, message, options){
      this.createAlert('alert' , title, message, options);
    }

    clearAll(){
        this.clearAll();
    }
    html(code , options){
      this.createAlert('html' , code , null, options);
    }
  
  
  }
  
  // Exporting an instance of SnapAlert (singleton)
  const snapAlertInstance = new SnapAlert();
  
  export default snapAlertInstance;
  