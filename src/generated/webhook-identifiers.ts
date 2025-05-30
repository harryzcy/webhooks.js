// THIS FILE IS GENERATED - DO NOT EDIT DIRECTLY
// make edits in scripts/generate-types.ts

import type { WebhookEventDefinition } from "../types.ts";

export type EventPayloadMap = {
  branch_protection_configuration:
    | WebhookEventDefinition<"branch-protection-configuration-disabled">
    | WebhookEventDefinition<"branch-protection-configuration-enabled">;
  branch_protection_rule:
    | WebhookEventDefinition<"branch-protection-rule-created">
    | WebhookEventDefinition<"branch-protection-rule-deleted">
    | WebhookEventDefinition<"branch-protection-rule-edited">;
  check_run:
    | WebhookEventDefinition<"check-run-completed">
    | WebhookEventDefinition<"check-run-created">
    | WebhookEventDefinition<"check-run-requested-action">
    | WebhookEventDefinition<"check-run-rerequested">;
  check_suite:
    | WebhookEventDefinition<"check-suite-completed">
    | WebhookEventDefinition<"check-suite-requested">
    | WebhookEventDefinition<"check-suite-rerequested">;
  code_scanning_alert:
    | WebhookEventDefinition<"code-scanning-alert-appeared-in-branch">
    | WebhookEventDefinition<"code-scanning-alert-closed-by-user">
    | WebhookEventDefinition<"code-scanning-alert-created">
    | WebhookEventDefinition<"code-scanning-alert-fixed">
    | WebhookEventDefinition<"code-scanning-alert-reopened">
    | WebhookEventDefinition<"code-scanning-alert-reopened-by-user">;
  commit_comment: WebhookEventDefinition<"commit-comment-created">;
  create: WebhookEventDefinition<"create">;
  custom_property:
    | WebhookEventDefinition<"custom-property-created">
    | WebhookEventDefinition<"custom-property-deleted">
    | WebhookEventDefinition<"custom-property-promoted-to-enterprise">
    | WebhookEventDefinition<"custom-property-updated">;
  custom_property_values: WebhookEventDefinition<"custom-property-values-updated">;
  delete: WebhookEventDefinition<"delete">;
  dependabot_alert:
    | WebhookEventDefinition<"dependabot-alert-auto-dismissed">
    | WebhookEventDefinition<"dependabot-alert-auto-reopened">
    | WebhookEventDefinition<"dependabot-alert-created">
    | WebhookEventDefinition<"dependabot-alert-dismissed">
    | WebhookEventDefinition<"dependabot-alert-fixed">
    | WebhookEventDefinition<"dependabot-alert-reintroduced">
    | WebhookEventDefinition<"dependabot-alert-reopened">;
  deploy_key:
    | WebhookEventDefinition<"deploy-key-created">
    | WebhookEventDefinition<"deploy-key-deleted">;
  deployment: WebhookEventDefinition<"deployment-created">;
  deployment_protection_rule: WebhookEventDefinition<"deployment-protection-rule-requested">;
  deployment_review:
    | WebhookEventDefinition<"deployment-review-approved">
    | WebhookEventDefinition<"deployment-review-rejected">
    | WebhookEventDefinition<"deployment-review-requested">;
  deployment_status: WebhookEventDefinition<"deployment-status-created">;
  discussion:
    | WebhookEventDefinition<"discussion-answered">
    | WebhookEventDefinition<"discussion-category-changed">
    | WebhookEventDefinition<"discussion-closed">
    | WebhookEventDefinition<"discussion-created">
    | WebhookEventDefinition<"discussion-deleted">
    | WebhookEventDefinition<"discussion-edited">
    | WebhookEventDefinition<"discussion-labeled">
    | WebhookEventDefinition<"discussion-locked">
    | WebhookEventDefinition<"discussion-pinned">
    | WebhookEventDefinition<"discussion-reopened">
    | WebhookEventDefinition<"discussion-transferred">
    | WebhookEventDefinition<"discussion-unanswered">
    | WebhookEventDefinition<"discussion-unlabeled">
    | WebhookEventDefinition<"discussion-unlocked">
    | WebhookEventDefinition<"discussion-unpinned">;
  discussion_comment:
    | WebhookEventDefinition<"discussion-comment-created">
    | WebhookEventDefinition<"discussion-comment-deleted">
    | WebhookEventDefinition<"discussion-comment-edited">;
  fork: WebhookEventDefinition<"fork">;
  github_app_authorization: WebhookEventDefinition<"github-app-authorization-revoked">;
  gollum: WebhookEventDefinition<"gollum">;
  installation:
    | WebhookEventDefinition<"installation-created">
    | WebhookEventDefinition<"installation-deleted">
    | WebhookEventDefinition<"installation-new-permissions-accepted">
    | WebhookEventDefinition<"installation-suspend">
    | WebhookEventDefinition<"installation-unsuspend">;
  installation_repositories:
    | WebhookEventDefinition<"installation-repositories-added">
    | WebhookEventDefinition<"installation-repositories-removed">;
  installation_target: WebhookEventDefinition<"installation-target-renamed">;
  issue_comment:
    | WebhookEventDefinition<"issue-comment-created">
    | WebhookEventDefinition<"issue-comment-deleted">
    | WebhookEventDefinition<"issue-comment-edited">;
  issues:
    | WebhookEventDefinition<"issues-assigned">
    | WebhookEventDefinition<"issues-closed">
    | WebhookEventDefinition<"issues-deleted">
    | WebhookEventDefinition<"issues-demilestoned">
    | WebhookEventDefinition<"issues-edited">
    | WebhookEventDefinition<"issues-labeled">
    | WebhookEventDefinition<"issues-locked">
    | WebhookEventDefinition<"issues-milestoned">
    | WebhookEventDefinition<"issues-opened">
    | WebhookEventDefinition<"issues-pinned">
    | WebhookEventDefinition<"issues-reopened">
    | WebhookEventDefinition<"issues-transferred">
    | WebhookEventDefinition<"issues-typed">
    | WebhookEventDefinition<"issues-unassigned">
    | WebhookEventDefinition<"issues-unlabeled">
    | WebhookEventDefinition<"issues-unlocked">
    | WebhookEventDefinition<"issues-unpinned">
    | WebhookEventDefinition<"issues-untyped">;
  label:
    | WebhookEventDefinition<"label-created">
    | WebhookEventDefinition<"label-deleted">
    | WebhookEventDefinition<"label-edited">;
  marketplace_purchase:
    | WebhookEventDefinition<"marketplace-purchase-cancelled">
    | WebhookEventDefinition<"marketplace-purchase-changed">
    | WebhookEventDefinition<"marketplace-purchase-pending-change">
    | WebhookEventDefinition<"marketplace-purchase-pending-change-cancelled">
    | WebhookEventDefinition<"marketplace-purchase-purchased">;
  member:
    | WebhookEventDefinition<"member-added">
    | WebhookEventDefinition<"member-edited">
    | WebhookEventDefinition<"member-removed">;
  membership:
    | WebhookEventDefinition<"membership-added">
    | WebhookEventDefinition<"membership-removed">;
  merge_group:
    | WebhookEventDefinition<"merge-group-checks-requested">
    | WebhookEventDefinition<"merge-group-destroyed">;
  meta: WebhookEventDefinition<"meta-deleted">;
  milestone:
    | WebhookEventDefinition<"milestone-closed">
    | WebhookEventDefinition<"milestone-created">
    | WebhookEventDefinition<"milestone-deleted">
    | WebhookEventDefinition<"milestone-edited">
    | WebhookEventDefinition<"milestone-opened">;
  org_block:
    | WebhookEventDefinition<"org-block-blocked">
    | WebhookEventDefinition<"org-block-unblocked">;
  organization:
    | WebhookEventDefinition<"organization-deleted">
    | WebhookEventDefinition<"organization-member-added">
    | WebhookEventDefinition<"organization-member-invited">
    | WebhookEventDefinition<"organization-member-removed">
    | WebhookEventDefinition<"organization-renamed">;
  package:
    | WebhookEventDefinition<"package-published">
    | WebhookEventDefinition<"package-updated">;
  page_build: WebhookEventDefinition<"page-build">;
  personal_access_token_request:
    | WebhookEventDefinition<"personal-access-token-request-approved">
    | WebhookEventDefinition<"personal-access-token-request-cancelled">
    | WebhookEventDefinition<"personal-access-token-request-created">
    | WebhookEventDefinition<"personal-access-token-request-denied">;
  ping: WebhookEventDefinition<"ping">;
  project_card:
    | WebhookEventDefinition<"project-card-converted">
    | WebhookEventDefinition<"project-card-created">
    | WebhookEventDefinition<"project-card-deleted">
    | WebhookEventDefinition<"project-card-edited">
    | WebhookEventDefinition<"project-card-moved">;
  project:
    | WebhookEventDefinition<"project-closed">
    | WebhookEventDefinition<"project-created">
    | WebhookEventDefinition<"project-deleted">
    | WebhookEventDefinition<"project-edited">
    | WebhookEventDefinition<"project-reopened">;
  project_column:
    | WebhookEventDefinition<"project-column-created">
    | WebhookEventDefinition<"project-column-deleted">
    | WebhookEventDefinition<"project-column-edited">
    | WebhookEventDefinition<"project-column-moved">;
  projects_v2:
    | WebhookEventDefinition<"projects-v2-closed">
    | WebhookEventDefinition<"projects-v2-created">
    | WebhookEventDefinition<"projects-v2-deleted">
    | WebhookEventDefinition<"projects-v2-edited">
    | WebhookEventDefinition<"projects-v2-reopened">;
  projects_v2_item:
    | WebhookEventDefinition<"projects-v2-item-archived">
    | WebhookEventDefinition<"projects-v2-item-converted">
    | WebhookEventDefinition<"projects-v2-item-created">
    | WebhookEventDefinition<"projects-v2-item-deleted">
    | WebhookEventDefinition<"projects-v2-item-edited">
    | WebhookEventDefinition<"projects-v2-item-reordered">
    | WebhookEventDefinition<"projects-v2-item-restored">;
  projects_v2_status_update:
    | WebhookEventDefinition<"projects-v2-status-update-created">
    | WebhookEventDefinition<"projects-v2-status-update-deleted">
    | WebhookEventDefinition<"projects-v2-status-update-edited">;
  public: WebhookEventDefinition<"public">;
  pull_request:
    | WebhookEventDefinition<"pull-request-assigned">
    | WebhookEventDefinition<"pull-request-auto-merge-disabled">
    | WebhookEventDefinition<"pull-request-auto-merge-enabled">
    | WebhookEventDefinition<"pull-request-closed">
    | WebhookEventDefinition<"pull-request-converted-to-draft">
    | WebhookEventDefinition<"pull-request-demilestoned">
    | WebhookEventDefinition<"pull-request-dequeued">
    | WebhookEventDefinition<"pull-request-edited">
    | WebhookEventDefinition<"pull-request-enqueued">
    | WebhookEventDefinition<"pull-request-labeled">
    | WebhookEventDefinition<"pull-request-locked">
    | WebhookEventDefinition<"pull-request-milestoned">
    | WebhookEventDefinition<"pull-request-opened">
    | WebhookEventDefinition<"pull-request-ready-for-review">
    | WebhookEventDefinition<"pull-request-reopened">
    | WebhookEventDefinition<"pull-request-review-request-removed">
    | WebhookEventDefinition<"pull-request-review-requested">
    | WebhookEventDefinition<"pull-request-synchronize">
    | WebhookEventDefinition<"pull-request-unassigned">
    | WebhookEventDefinition<"pull-request-unlabeled">
    | WebhookEventDefinition<"pull-request-unlocked">;
  pull_request_review_comment:
    | WebhookEventDefinition<"pull-request-review-comment-created">
    | WebhookEventDefinition<"pull-request-review-comment-deleted">
    | WebhookEventDefinition<"pull-request-review-comment-edited">;
  pull_request_review:
    | WebhookEventDefinition<"pull-request-review-dismissed">
    | WebhookEventDefinition<"pull-request-review-edited">
    | WebhookEventDefinition<"pull-request-review-submitted">;
  pull_request_review_thread:
    | WebhookEventDefinition<"pull-request-review-thread-resolved">
    | WebhookEventDefinition<"pull-request-review-thread-unresolved">;
  push: WebhookEventDefinition<"push">;
  registry_package:
    | WebhookEventDefinition<"registry-package-published">
    | WebhookEventDefinition<"registry-package-updated">;
  release:
    | WebhookEventDefinition<"release-created">
    | WebhookEventDefinition<"release-deleted">
    | WebhookEventDefinition<"release-edited">
    | WebhookEventDefinition<"release-prereleased">
    | WebhookEventDefinition<"release-published">
    | WebhookEventDefinition<"release-released">
    | WebhookEventDefinition<"release-unpublished">;
  repository_advisory:
    | WebhookEventDefinition<"repository-advisory-published">
    | WebhookEventDefinition<"repository-advisory-reported">;
  repository:
    | WebhookEventDefinition<"repository-archived">
    | WebhookEventDefinition<"repository-created">
    | WebhookEventDefinition<"repository-deleted">
    | WebhookEventDefinition<"repository-edited">
    | WebhookEventDefinition<"repository-privatized">
    | WebhookEventDefinition<"repository-publicized">
    | WebhookEventDefinition<"repository-renamed">
    | WebhookEventDefinition<"repository-transferred">
    | WebhookEventDefinition<"repository-unarchived">;
  repository_dispatch: WebhookEventDefinition<"repository-dispatch-sample.collected">;
  repository_import: WebhookEventDefinition<"repository-import">;
  repository_ruleset:
    | WebhookEventDefinition<"repository-ruleset-created">
    | WebhookEventDefinition<"repository-ruleset-deleted">
    | WebhookEventDefinition<"repository-ruleset-edited">;
  repository_vulnerability_alert:
    | WebhookEventDefinition<"repository-vulnerability-alert-create">
    | WebhookEventDefinition<"repository-vulnerability-alert-dismiss">
    | WebhookEventDefinition<"repository-vulnerability-alert-reopen">
    | WebhookEventDefinition<"repository-vulnerability-alert-resolve">;
  secret_scanning_alert:
    | WebhookEventDefinition<"secret-scanning-alert-created">
    | WebhookEventDefinition<"secret-scanning-alert-publicly-leaked">
    | WebhookEventDefinition<"secret-scanning-alert-reopened">
    | WebhookEventDefinition<"secret-scanning-alert-resolved">
    | WebhookEventDefinition<"secret-scanning-alert-validated">;
  secret_scanning_alert_location: WebhookEventDefinition<"secret-scanning-alert-location-created">;
  secret_scanning_scan: WebhookEventDefinition<"secret-scanning-scan-completed">;
  security_advisory:
    | WebhookEventDefinition<"security-advisory-published">
    | WebhookEventDefinition<"security-advisory-updated">
    | WebhookEventDefinition<"security-advisory-withdrawn">;
  security_and_analysis: WebhookEventDefinition<"security-and-analysis">;
  sponsorship:
    | WebhookEventDefinition<"sponsorship-cancelled">
    | WebhookEventDefinition<"sponsorship-created">
    | WebhookEventDefinition<"sponsorship-edited">
    | WebhookEventDefinition<"sponsorship-pending-cancellation">
    | WebhookEventDefinition<"sponsorship-pending-tier-change">
    | WebhookEventDefinition<"sponsorship-tier-changed">;
  star:
    | WebhookEventDefinition<"star-created">
    | WebhookEventDefinition<"star-deleted">;
  status: WebhookEventDefinition<"status">;
  sub_issues:
    | WebhookEventDefinition<"sub-issues-parent-issue-added">
    | WebhookEventDefinition<"sub-issues-parent-issue-removed">
    | WebhookEventDefinition<"sub-issues-sub-issue-added">
    | WebhookEventDefinition<"sub-issues-sub-issue-removed">;
  team_add: WebhookEventDefinition<"team-add">;
  team:
    | WebhookEventDefinition<"team-added-to-repository">
    | WebhookEventDefinition<"team-created">
    | WebhookEventDefinition<"team-deleted">
    | WebhookEventDefinition<"team-edited">
    | WebhookEventDefinition<"team-removed-from-repository">;
  watch: WebhookEventDefinition<"watch-started">;
  workflow_dispatch: WebhookEventDefinition<"workflow-dispatch">;
  workflow_job:
    | WebhookEventDefinition<"workflow-job-completed">
    | WebhookEventDefinition<"workflow-job-in-progress">
    | WebhookEventDefinition<"workflow-job-queued">
    | WebhookEventDefinition<"workflow-job-waiting">;
  workflow_run:
    | WebhookEventDefinition<"workflow-run-completed">
    | WebhookEventDefinition<"workflow-run-in-progress">
    | WebhookEventDefinition<"workflow-run-requested">;
};
export type WebhookEventName = keyof EventPayloadMap;
