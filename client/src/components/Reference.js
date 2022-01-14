import styles from '../styles/Reference.module.css'


export default function Reference() {
  const comprehension = [
    "Disengaged: diverted attention/no commitment/avoids learning",
    "Retreatism: no attention/no commitment/little inquiry, interest or collaboration in learning",
    "Ritual Compliance: low attention/low commitment/minimal effort to avoid negative consequences, no self direction or motivation, minimal inquiry",
    "Strategic Compliance: high attention/low commitment/minimal effort, focus and task completion to meet learning",
    "Engagement: high attention/high commitment/self-directed learning, persistent sustained inquiry, self-directed learning, highly motivated and engaged",
  ]

  return (
    <div className={styles.container}>
      <h1>Site Reference</h1>
      <h2>Tracking</h2>
      <p>Below is some information to which you can refer while filling out student tracking.</p>
      <div className={styles.section}>
        <h3>Scale of Comprehension/Mastery Scores</h3>
        {
          comprehension.map((description, idx) => {
            return (
              <div className={styles.box}>
                <div className={styles.row}>
                  <div className={styles.cell}>{idx + 1}</div>
                  <div className={styles.cell}>{description}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
