# Changesets

此目录用于管理版本发布。修改包代码后，运行：

```bash
pnpm changeset
```

选择一个 minor 变更类型并填写描述，然后提交变更集文件。CI 中的 release 工作流会据此自动 bump 版本并发布到 npm。
