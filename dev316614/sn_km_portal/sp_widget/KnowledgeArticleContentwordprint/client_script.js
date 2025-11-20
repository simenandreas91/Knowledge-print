function($rootScope, $scope, $window, $timeout, spUtil, $sce, spModal, $uibModal, $location, cabrillo, snAnalytics) {
    /* widget controller */
    var c = this;
    // Fallback inline logo for FFI text mark (Forsvarets forskningsinstitutt)
    var fallbackLogoSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" aria-label="FFI">' +
          '<rect width="380" height="110" fill="white"/>' +
          '<g fill="#111" font-family="Arial, sans-serif" font-weight="700" font-size="72">' +
            '<text x="10" y="78">FFI</text>' +
          '</g>' +
          '<g fill="#111" font-family="Arial, sans-serif" font-size="36">' +
            '<text x="140" y="54">Forsvarets</text>' +
            '<text x="140" y="98">forskningsinstitutt</text>' +
          '</g>' +
        '</svg>';
    var fallbackLogoUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(fallbackLogoSvg);
    c.logoFallbackSvg = fallbackLogoSvg;
    c.logoFallbackUrl = fallbackLogoUrl;
    if (c.data.redirect) {
        var id = $location.search().sys_kb_id ? 'sys_kb_id' : 'sys_id';
        if ($location.search()[id] && $location.search()[id] !== c.data.redirect) {
            $location.state({
                addSPA: true
            });
            $location.search('spa', 1);
            $location.search(id, c.data.redirect);
            $location.replace();
        }
    }

    c.printArticle = function(myID) {
        // Keep a copy of the current DOM so we can restore it later
        var originalHTML = document.body.innerHTML;

        // Grab the current article HTML
        var articleElement = document.getElementById(myID);
        if (!articleElement) {
            // Fallback: if the element id is wrong, just do a normal print
            window.print();
            return;
        }

        var escapeHtml = function(value) {
            if (value === undefined || value === null)
                return '';
            return String(value).replace(/[&<>"']/g, function(char) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;'
                }[char];
            });
        };

        var articleHTML = articleElement.innerHTML;
        var policyDetails = c.data.policyInfo || {};
        var policyNumber = escapeHtml(policyDetails.number || '');
        var policyType = escapeHtml(policyDetails.type || '');
        var policyName = escapeHtml(policyDetails.name || '');
        var policyCategory = escapeHtml(policyDetails.policy_category || '');
        var policyGradingLevel = escapeHtml(policyDetails.grading_level || '');
        var policyValidFrom = escapeHtml(policyDetails.valid_from || '');
        var policyApprovers = escapeHtml(policyDetails.approvers || '');
        var policyOwner = escapeHtml(policyDetails.owner || '');
        var policyState = escapeHtml(policyDetails.state || '');
        var policyArticleVersion = escapeHtml(policyDetails.article_version || '');

        // Simple text-only "logo" placeholder
        var logoMarkup =
            '<div style="display:flex; justify-content:center; align-items:center; width:100%; padding:10px 6px;">' +
                '<div style="display:flex; align-items:center;">' +
                    '<div style="font-family: \'Segoe UI\', \'Helvetica Neue\', Roboto, Arial, sans-serif; font-size:36px; font-weight:700; color:#1f1f1f; letter-spacing:0.18px; margin-right:10px;">FFI</div>' +
                    '<div style="display:flex; flex-direction:column; align-items:flex-start; text-align:left; font-family: \'Segoe UI\', \'Helvetica Neue\', Roboto, Arial, sans-serif; color:#1f1f1f; line-height:1.15;">' +
                        '<span style="font-size:14px; font-weight:400; padding:0; margin:0; letter-spacing:0.05px;">Forsvarets</span>' +
                        '<span style="font-size:14px; font-weight:400; padding:0; margin:0; letter-spacing:0.05px;">forskningsinstitutt</span>' +
                    '</div>' +
                '</div>' +
            '</div>';

        var metadataHeaderHTML =
            '<div style="font-family: Arial, sans-serif; font-size: 11px; color:#000;">' +
            '<table style="width: 100%; border-collapse: collapse; border: 1px solid #000; margin: 0 4px 6px 4px; font-size: 11px;">' +
            '<tr style="height: 60px;">' +
            '<td style="width: 18%; min-width: 150px; border: 1px solid #000; text-align: center; vertical-align: middle; padding: 8px 8px;">' +
            logoMarkup +
            '</td>' +
            '<td colspan="3" style="border: 1px solid #000; text-align: center; padding: 5px 10px;">' +
            '<div style="font-size: 11px; margin-bottom: 2px;">' + (policyType || '&nbsp;') + '</div>' +
            '<div style="font-size: 18px; font-weight: bold; margin-bottom: 2px; color:#003366;">' + (policyName || '&nbsp;') + '</div>' +
            '<div style="font-size: 11px;">' + (policyCategory || '&nbsp;') + '</div>' +
            '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="border: 1px solid #000; padding: 6px; font-size: 11px;">' +
            '<div><strong>Dokument-ID:</strong> ' + (policyNumber || 'N/A') + '</div>' +
            '<div><strong>Versjon:</strong> ' + (policyArticleVersion || 'N/A') + '</div>' +
            '<div><strong>Status:</strong> ' + (policyState || 'N/A') + '</div>' +
            '</td>' +
            '<td style="border: 1px solid #000; padding: 6px; font-size: 11px;">' +
            '<div><strong>Dokumentansvarlig:</strong> ' + (policyOwner || 'N/A') + '</div>' +
            '<div style="margin-top: 4px;"><strong>Utarbeidet av:</strong> ' + (policyOwner || 'N/A') + '</div>' +
            '</td>' +
            '<td style="border: 1px solid #000; padding: 6px; font-size: 11px;">' +
            '<div><strong>Godkjent av:</strong> ' + (policyApprovers || 'N/A') + '</div>' +
            '</td>' +
            '<td style="border: 1px solid #000; padding: 6px; font-size: 11px; width: 18%;">' +
            '<div><strong>Godkjent fra:</strong> ' + (policyValidFrom || 'N/A') + '</div>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '<div style="display: flex; justify-content: flex-end; color:#003366; font-size: 11px; margin: 0 4px 12px 4px;">' +
            '<span>Graderingsniv&aring;: ' + (policyGradingLevel || '&nbsp;') + '</span>' +
            '</div>' +
            '</div>';

        // Build the printable document: metadata header + article content
        document.body.innerHTML = metadataHeaderHTML + articleHTML;

        // Remove elements you don’t want in the PDF
        document.querySelectorAll('.title-secondary-data, .transparent-button')
            .forEach(function(el) {
                el.parentNode && el.parentNode.removeChild(el);
            });

        // Wait for images (logo/attachments) to load before printing
        var printed = false;
        var restoreAndReload = function() {
            if (printed)
                return;
            printed = true;
            window.print();
            document.body.innerHTML = originalHTML;
            window.location.reload();
        };

        var imgs = Array.prototype.slice.call(document.querySelectorAll('img'));
        if (imgs.length === 0) {
            restoreAndReload();
        } else {
            var remaining = imgs.length;
            var done = function() {
                remaining--;
                if (remaining <= 0)
                    restoreAndReload();
            };
            imgs.forEach(function(img) {
                if (img.complete && img.naturalWidth !== 0) {
                    done();
                } else {
                    img.onload = done;
                    img.onerror = done;
                }
            });
            // Fallback: ensure print still happens even if an image never finishes
            $timeout(restoreAndReload, 500);
        }
    };


    if (c.data.replacementArticleId) {
        var queryParameters = $location.search();
        var articleIdentifier = queryParameters.hasOwnProperty('sys_kb_id') ? 'sys_kb_id' : queryParameters.hasOwnProperty('sysparm_article') ? 'sysparm_article' : 'sys_id';

        if (queryParameters[articleIdentifier] !== c.data.replacementArticleId) {
            $location.state({
                addSPA: true
            });
            $location.search('spa', 1);
            $location.search(articleIdentifier, c.data.replacementArticleId);
            $location.replace();
        }

        if (c.data.page_title && c.data.page_title != $window.document.title) {
            $window.document.title = c.data.page_title;
        }
    }

    $window.onpopstate = function(e) {
        if (e && e.state && e.state.addSPA) {
            $location.search('spa', null);
            $location.replace();
        }
    };

    if (c.data.isValid) {
        if (c.data.kbContentData && c.data.kbContentData.isTemplate) {
            //alert(c.data.kbContentData.data);
            c.data.kbContentData.data.forEach(function(field) {
                if (field.type == 'html')
                    field.content = $sce.trustAsHtml(field.content);
                //alert(field.content);

            });

            if (c.data.articleType === 'wiki') {
                c.data.kbWiki = $sce.trustAsHtml(c.data.kbWiki);
                //alert(c.data.kbWiki);
            }
        } else if (c.data.articleType === 'wiki') {
            c.data.kbWiki = $sce.trustAsHtml(c.data.kbWiki);
            //alert(c.data.kbWiki);
        } else {
            c.data.kbContentData.data = $sce.trustAsHtml(c.data.kbContentData.data);
            c.data.wordCount = c.data.kbContentData.data.toString().replace(/(<([^>]+)>)/ig, '').split(' ').length;
        }
    }

    $scope.submitted = false;
    c.flagMessage = null;
    $timeout(function() {
        $rootScope.$broadcast("sp.update.breadcrumbs", $scope.data.breadCrumb);
    });
    $rootScope.properties = $scope.data.properties;
    $rootScope.messages = $scope.data.messages;
    $rootScope.isValid = c.data.isValid;
    $rootScope.isKBAdmin = $scope.data.isKBAdmin;
    $rootScope.isKBOwner = $scope.data.isKBOwner;
    $rootScope.article_sys_id = $scope.data.article_sys_id;
    $rootScope.attachments = $scope.data.attachments;
    $rootScope.attachedIncidents = $scope.data.attachedIncidents;
    $rootScope.affectedProducts = $scope.data.affectedProducts;
    $rootScope.displayAttachments = $scope.data.displayAttachments;
    $rootScope.hideFeedbackOptions = $scope.data.hideFeedbackOptions;
    $rootScope.helpfulContent = $scope.data.helpfulContent;
    $rootScope.tableName = $scope.data.tableName;
    $rootScope.hasComments = $scope.data.hasComments;
    $scope.data.isSubscribed = $scope.data.isArticleSubscribed || $scope.data.isArticleSubscribedAtKB;
    $scope.data.subscribeLabel = ($scope.data.isSubscribed ? $scope.data.messages.SUBSCRIBED : $scope.data.messages.SUBSCRIBE);
    c.createIncidentURL = c.options.create_task_url || ($scope.data.properties && $scope.data.properties.createIncidentURL);
    c.createIncidentLabel = c.options.create_task_prompt || $scope.data.messages.CREATE_INCIDENT;
    c.showCreateIncident = c.data.isLoggedInUser && c.options.show_create_incident_action != 'false' && c.data.properties && c.data.properties.showKBCreateIncident && c.createIncidentURL;
    c.showFlagArticle = c.data.properties && c.data.properties.showKBFlagArticle && c.data.properties.showRatingOptions;
    c.showMenu = c.data.properties && (c.showFlagArticle || c.data.properties.isEditable || c.showCreateIncident);
    $rootScope.stackUrl = window.location.pathname + '?id=' + c.data.params.sysparm_article_view_page_id + '%26' + (c.data.params.sysparm_article ? 'sysparm_article=' + c.data.params.sysparm_article : 'sys_kb_id=' + c.data.params.sys_kb_id);
    c.stackUrl = $rootScope.stackUrl;
    c.flagMessage = '';
    c.task = {};
    c.imageInstance = '';
    $scope.data.toggleSubscribed = ($scope.data.isSubscribed ? true : false);
    c.reasons = c.data.feedback_reasons;
    c.data.reason = '4';
    c.imageInstance = '';
    c.minImageHeight = parseInt(c.options.min_image_height) || 100;
    c.minImageWidth = parseInt(c.options.min_image_width) || 185;
    c.readOnly = false;
    c.isMobile = spUtil.isMobile() || cabrillo.isNative();
    c.isAgentApp = navigator.userAgent.indexOf('Agent') > -1;
    c.editUrl = c.data.wordOnlineUrl || 'kb_knowledge.do?sys_id=' + c.data.article_sys_id + '&sysparm_stack=' + c.stackUrl;

    //Use KB specific stylic for all portals unless rating style is set
    c.KBRatingStyle = c.options.kb_rating_style;

    if (c.data.langList && c.data.langList.length > 1) {
        for (var lng in c.data.langList) {
            if (c.data.langList[lng].selected == true) {
                c.selectedLanguage = c.data.langList[lng];
                break;
            }
        }
    }

    var payload = {};
    payload.name = "View Knowledge Article";
    payload.data = {};
    payload.data["Article Title"] = c.data.shortDesc;
    payload.data["Article SysID"] = c.data.article_sys_id;
    payload.data["Language"] = c.selectedLanguage || "en";
    snAnalytics.addEvent(payload);

    populateBreadCrumbURLs();

    function populateBreadCrumbURLs() {
        if (c.data.breadCrumb) {
            if (c.data.breadCrumb[0].type == 'kb_knowledge_base') {
                if (c.data.showKbHomeLink && c.data.kb_knowledge_page != 'kb_search') {
                    c.data.breadCrumb[0].url = '?id=' + c.data.kb_knowledge_page + '&kb_id=' + c.data.breadCrumb[0].values.kb_knowledge_base;
                } else {
                    c.data.breadCrumb[0].url = '?id=kb_search&kb_knowledge_base=' + c.data.breadCrumb[0].values.kb_knowledge_base;
                }
            }

            for (var i = 1; i < c.data.breadCrumb.length; i++) {
                if (c.data.breadCrumb[i].type == 'kb_category') {
                    if (c.data.showKbHomeLink && c.data.kb_knowledge_page != 'kb_search') {
                        if (c.data.breadCrumb[i].values.kb_category == "NULL_VALUE") {
                            c.data.breadCrumb.splice(i, 1);
                        } else {
                            c.data.breadCrumb[i].url = '?id=kb_category&kb_id=' + c.data.breadCrumb[i].values.kb_knowledge_base + '&kb_category=' + c.data.breadCrumb[i].values.kb_category;
                        }
                    } else {
                        c.data.breadCrumb[i].url = '?id=kb_search&kb_knowledge_base=' + c.data.breadCrumb[i].values.kb_knowledge_base + '&kb_category=' + c.data.breadCrumb[i].values.kb_category;
                    }
                }
            }
        }
    }

    var shouldSetTitle = c.data.params.sysparm_language && (c.data.number != c.data.params.sysparm_article);
    if (c.options.set_page_title != 'false' || shouldSetTitle) {
        if (c.data.page_title) {
            // setting default page title for supporting km seo
            $window.document.title = c.data.page_title;
            var metaTag = $('meta[custom-tag][name="description"]')[0];

            if (metaTag)
                metaTag.content = c.data.meta_tag;
        }
    }

    c.showVersions = false;
    c.toggleVersions = function() {
        c.showVersions = !c.showVersions;
    };

    c.selectLanguage = function(ind) {
        var viewAsUser = "";

        if (c.data.params.view_as_user.length > 0)
            viewAsUser = "&view_as_user=" + c.data.params.view_as_user;

        $window.location.replace('?id=' + c.data.params.sysparm_article_view_page_id + '&sys_kb_id=' + c.data.langList[ind].sys_id + viewAsUser);
    };

    c.showActionMenu = function() {
        if (c.showMenu) {
            return true;
        } else {
            if (c.data.properties && c.data.properties.isSubscriptionEnabled && $window.innerWidth < 992)
                return true;
            else
                return false;
        }
    }

    c.toggleSection = function(field) {
        field.collapsed = !field.collapsed;
        $('#' + field.column).slideToggle("fast");
    };

    c.handleSubscribeButtonFocus = function() {
        if ($scope.data.isSubscribed) {
            $scope.data.subscribeLabel = $rootScope.messages.UNSUBSCRIBE;
            $scope.data.toggleSubscribed = !$scope.data.toggleSubscribed;
        }

    };

    c.handleSubscribeButtonBlur = function() {
        if ($scope.data.isSubscribed) {
            $scope.data.subscribeLabel = $rootScope.messages.SUBSCRIBED;
            $scope.data.toggleSubscribed = !$scope.data.toggleSubscribed;
        }
    }
    c.closeUnsubscribeModal = function() {
        $("#unSubscribeModal").modal('hide');
    };

    c.handleSubscription = function(confirmation) {
        c.data.actionName = null;
        if (!$scope.data.isSubscribed) {
            c.data.actionName = 'subscribe';
            c.data.articleSysId = $scope.data.article_sys_id;
            c.data.articleNum = $scope.data.number;
        } else {
            if ($scope.data.isArticleSubscribed && !$scope.data.isArticleSubscribedAtKB) {
                c.data.actionName = "unsubscribe";
                c.data.articleSysId = $scope.data.article_sys_id;
                c.data.articleNum = $scope.data.number;
                c.data.unsubscribeKB = false;
            } else if (!confirmation) {
                //$("#unSubscribeModal").modal();
                var unsubscribeMessage = "<p>" + c.data.messages.UNSUBSCRIBE_CONTENT + "</p><p><b>" + c.data.messages.UNSUBSCRIBE_CONFIRMATION + "</b></p>";
                spModal.open({
                    title: c.data.messages.UNSUBSCRIBE,
                    buttons: [{
                        label: c.data.messages.NO,
                        cancel: true
                    }, {
                        label: c.data.messages.YES,
                        primary: true
                    }],
                    message: unsubscribeMessage
                }).then(function() {
                    c.handleSubscription('Y');
                }, function() {
                    c.closeUnsubscribeModal();
                });

                return;
            } else if (confirmation === 'Y') {
                c.data.actionName = "unsubscribe";
                c.closeUnsubscribeModal();
                c.data.articleSysId = $scope.data.article_sys_id;
                c.data.kbSysId = $scope.data.kbSysId;
                c.data.articleNum = $scope.data.number;
                c.data.kbName = $scope.data.kbName;
                c.data.unsubscribeKB = true;
            }
        }
        c.server.get({
            action: c.data.actionName,
            kbSysId: c.data.kbSysId,
            kbName: c.data.kbName,
            articleSysId: c.data.articleSysId,
            articleNum: c.data.articleNum,
            unsubscribeKB: c.data.unsubscribeKB,
            isArticleSubscribed: c.data.isArticleSubscribed,
            isKBSubscribed: c.data.isArticleSubscribedAtKB
        }).then(function(resp) {
            if (c.data.actionName == 'subscribe') {
                $scope.data.isArticleSubscribed = true;
                $scope.data.isSubscribed = true;
                $scope.data.subscribeLabel = $rootScope.messages.SUBSCRIBED;
            } else {
                $scope.data.isArticleSubscribed = false;
                $scope.data.isSubscribed = false;
                $scope.data.isArticleSubscribedAtKB = false;
                $scope.data.subscribeLabel = $rootScope.messages.SUBSCRIBE;
            }
            c.showUIMessage('info', resp.data.responseMessage);

        });
    };



    c.submitFlagComments = function() {
        if (!c.data.comment) {
            c.flagMessage = "${Please provide a comment to flag the article}";
            $("#flagComment").focus();
            return false;
        } else {
            $("#submitFlagComment").attr("disabled", true);
            c.server.get({
                action: 'saveFlagComment',
                article_sys_id: c.data.article_sys_id,
                comment: c.data.comment
            }).then(function(resp) {
                if (resp.data.feedbackSuccess)
                    c.showUIMessage('info', c.data.messages.ARTICLE_FLAGGED);
                else
                    c.showUIMessage('error', c.data.messages.RATE_LIMIT_REACHED);
            });
            c.clearComment();

        }

    };

    c.copyPermalink = function() {
        var v = document.createElement('textarea');
        var permalink = document.location.origin + document.location.pathname + '?id=' + c.data.params.sysparm_article_view_page_id + '&sysparm_article=' + $scope.data.number;
        v.innerHTML = permalink;
        v.className = "sr-only";
        document.body.appendChild(v);
        v.select();
        var result = true;
        try {
            result = document.execCommand('copy');
        } catch (err) {
            result = false;
        } finally {
            document.body.removeChild(v);
        }
        if (result === true) {
            c.showUIMessage('info', c.data.messages.PERMALINK_COPIED);
        } else {
            $window.prompt("${Because of a browser limitation the URL can not be placed directly in the clipboard. Please use Ctrl-C to copy the data and escape to dismiss this dialog}", permalink);
        }
        $('p.kb-permalink button').focus();
    };
    var modal = null;
    c.launchFlagModal = function(e) {
        c.clearComment();
        var pageRoot = angular.element('.sp-page-root');
        modal = $uibModal.open({
            title: c.data.messages.FLAG_THIS_ARTICLE,
            scope: $scope,
            templateUrl: 'kb-flag-article-modal',
            keyboard: true,
            controller: function($scope) {
                $scope.$on('modal.closing', function() {
                    pageRoot.attr('aria-hidden', 'false');
                    // Toggle dropdown if not already visible:
                    if ($('.dropdown').find('.moreActionsMenuList').is(":hidden") && !$("#submitFlagComment").attr("disabled")) {
                        $('.more-actions-menu').dropdown('toggle');
                        //Give focus to the flagArticle 
                        $('#flagArticleButton').focus();
                    }
                });
            }
        });
        modal.rendered.then(function() {
            //hide the root page headings when modal is active
            pageRoot.attr('aria-hidden', 'true');
            $("#flagComment").focus();

        });
        e.stopPropagation();
    }

    var taskPopUp = $rootScope.$on("sp.kb.feedback.openTaskPopup", function(event, data) {
        c.ftask = {};
        if (data) {
            c.launchFeedbackTaskModal();
            c.ftask.feedback_action = data.feedback_data.action;
            c.ftask.feedback_rating = data.feedback_data.rating
            c.ftask.action = "createFeedbackTask";

        }
    });

    c.launchFeedbackTaskModal = function() {
        var pageRoot = angular.element('.sp-page-root');
        c.clearFeedbackTask();
        modal = $uibModal.open({
            title: c.data.messages.FEEDBACK,
            windowClass: 'app-modal-window',
            scope: $scope,
            templateUrl: 'kb-feedback-task-modal',
            keyboard: true,
            controller: function($scope) {
                $scope.$on("modal.closing", function() {
                    pageRoot.attr('aria-hidden', 'false');
                    $('#useful_no').focus();

                    if (!c.submitted) {
                        c.data.reason = "4";
                        c.data.details = "";
                    }
                    if (c.ftask.action == "createFeedbackTaskWithFlagComment" && !c.submitted)
                        return;
                    modal = null;
                    c.server.get({
                        action: c.ftask.action,
                        article_sys_id: c.data.article_sys_id,
                        reason: c.data.reason,
                        details: c.data.details,
                        feedback_action: c.ftask.feedback_action,
                        rating: c.ftask.feedback_rating
                    }).then(function(resp) {
                        if (resp.data.responseMessage) {
                            if (resp.data.feedbackSuccess) {
                                c.showUIMessage('info', resp.data.responseMessage);
                            } else {
                                c.showUIMessage('error', resp.data.responseMessage);
                            }

                        }
                    });
                    c.clearFeedbackTask();
                });
            }
        });
        modal.rendered.then(function() {
            //hide the root page headings when modal is active
            pageRoot.attr('aria-hidden', 'true');
            $('.type-multiple_choice input[aria-checked="true"]').focus();
        });

    }

    c.clearComment = function(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        $scope.data.comment = '';
        c.flagMessage = '';
        c.closePopup();
    }

    c.closeTaskPopup = function(e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        modal.dismiss({
            $value: "dismiss"
        });
        $('#useful_no').focus();
    }

    c.selectReason = function(e, elem) {
        // space keycode to select the radio button
        if (e.keyCode == 32) {
            $("div.type-multiple_choice").find("input[type=radio]").each(function() {
                $(this).attr("checked", false);
                $(this).attr("aria-checked", false);
                $(this).find("input[type=radio]").attr("checked", false);
                $(this).find("input[type=radio]").attr("aria-checked", false);
            });
            $(e.target).click();
            $(e.target).find("input[type=radio]").click();
        }

    }

    c.showUIMessage = function(type, msg) {
        if (cabrillo.isNative()) {
            cabrillo.message.showMessage(type != 'error' ? cabrillo.message.SUCCESS_MESSAGE_STYLE : cabrillo.message.ERROR_MESSAGE_STYLE, msg);
        } else {
            if (type == 'error')
                spUtil.addErrorMessage(msg);
            else
                spUtil.addInfoMessage(msg);
        }
    }

    c.closePopup = function() {
        if (modal) {
            modal.dismiss();
        }
    }

    c.clearFeedbackTask = function() {
        c.submitted = false;
        c.data.reason = '4';
        c.data.details = '';
        c.flagMessage = '';
        c.ftask = {};
        c.closePopup();
    }

    c.submitFeedbackTask = function() {
        if (!c.data.reason) {
            c.flagMessage = "${Please provide the mandatory details}";
            $("#detailsComment").focus();
            return false;
        } else {
            c.submitted = true;
            c.closePopup();
        }
    }

    c.imgModalClose = function() {
        c.imageInstance.close();
    }

    c.getLabelForTemplateField = function(label, isCollapsed) {
        if (isCollapsed)
            return label + " " + c.data.messages.COLLAPSED_FIELD;
        else
            return label + " " + c.data.messages.EXPANDED_FIELD;
    }

    $scope.$on("$destroy", taskPopUp);

    $("#flagComment").keydown(function(ev) {
        if (ev.which == 13)
            $("#flagComment").click();
    });

    c.handleKeyDown = function(ev) {
        if (ev.which == 13)
            $(ev.target).click();
    }

    var favoriteEvent = $rootScope.$on('favorite', function(e, favorite) {
        $scope.showFavorite = favorite.showFavorite;
        $scope.isFavorite = favorite.isFavorite;
    });
    $scope.$on("$destroy", favoriteEvent);

    $scope.toggleFavorite = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.$broadcast('toggleFavorite');
    }

}
