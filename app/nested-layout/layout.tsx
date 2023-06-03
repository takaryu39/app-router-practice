const FirstLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mt-6 text-center">
      <p>Layout 1</p>
      {children}
      {/* 同階層のpage.tsxが渡されている */}
    </main>
  )
}

export default FirstLayout
