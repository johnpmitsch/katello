//require "\.angular-patternfly/angular-patternfly.js"
function requireAll(r) { r.keys().forEach(r); }

require('angular-ui-router');
require("./bastion.module")
require("./routing.module")

require("./i18n/i18n.module")
require("./i18n/translate.service")
require("./i18n/translations")

require("./auth/auth.module")
requireAll(require.context('./auth/', true, /\.js$/));

require("./menu/menu.module")
requireAll(require.context('./menu/', true, /\.js$/));

require("./components/components.module")
require("./components/formatters/components-formatters.module")
requireAll(require.context('./components/', true, /\.js$/));

require("./utils/utils.module")
requireAll(require.context('./utils/', true, /\.js$/));

require("./features/features.module")
requireAll(require.context('./features/', true, /\.js$/));

require("./bastion-bootstrap")
