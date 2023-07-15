//ENUM
const RoleSelector = require("../helper/enum/Role");

const createLocator = (page, cmd, locator = null) => {
    let elem;
    if (locator) {
        elem = locator;
    } else {
        elem = page;
    }

    if (cmd.locatorType == 0) {
        var options = cmd.options;
        for (var prop in options) {
            if (options.hasOwnProperty(prop) && options[prop] === null) {
                delete options[prop];
            }
        }

        if (options) {
            locator = elem.getByRole(RoleSelector.Role(cmd.role), options);
        } else {
            locator = elem.getByRole(RoleSelector.Role(cmd.role));
        }
    } else if (cmd.locatorType == 1) {
        locator = elem.locator(cmd.query);
    } else if (cmd.locatorType == 5) {
        locator = elem.frameLocator(cmd.query);
    } else if (cmd.locatorType == 6) {
        locator = elem.getByPlaceholder(cmd.query);
    } else if (cmd.locatorType == 7) {
        locator = elem.getByText(cmd.query);
    } else if (cmd.locatorType == 8) {
        locator = elem.getByTitle(cmd.query);
    }

    if (cmd.nth) {
        locator = locator.nth(cmd.nth);
    }

    if (cmd.consecutiveCommand) {
        locator = createLocator(page, cmd.consecutiveCommand, locator);
    }

    return locator;
};

module.exports = { createLocator };
